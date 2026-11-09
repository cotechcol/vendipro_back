import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ContainerDeposit } from './entities/container-deposit.entity';
import { ContainerDepositReturn } from './entities/container-deposit-return.entity';
import { CashSession } from '../cash-sessions/entities/cash-session.entity';
import { CashSessionStatus, ContainerDepositStatus, OptionGroupKind } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';
import { Product } from '../products/entities/product.entity';
import type { Sale } from '../sales/entities/sale.entity';
import type { CreateSaleDto } from '../sales/dto/sale.dto';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function serializeDeposit(deposit: ContainerDeposit) {
  const pendingCount = Number(deposit.containerCount) - Number(deposit.returnedCount);
  const pendingAmount = Number((Number(deposit.totalAmount) - Number(deposit.returnedAmount)).toFixed(2));
  return {
    id: deposit.id,
    code: deposit.code,
    saleId: deposit.saleId,
    containerCount: Number(deposit.containerCount),
    unitAmount: Number(deposit.unitAmount),
    totalAmount: Number(deposit.totalAmount),
    returnedCount: Number(deposit.returnedCount),
    returnedAmount: Number(deposit.returnedAmount),
    pendingCount,
    pendingAmount,
    status: deposit.status,
    createdAt: deposit.createdAt,
  };
}

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(ContainerDeposit) private repo: Repository<ContainerDeposit>,
    @InjectRepository(ContainerDepositReturn) private returnRepo: Repository<ContainerDepositReturn>,
    private dataSource: DataSource,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async findBySale(saleId: number, storeId: number) {
    return this.repo.findOne({ where: { saleId, storeId } });
  }

  async lookup(code: string, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const normalized = (code ?? '').trim().toUpperCase();
    if (normalized.length < 3) {
      throw new BadRequestException('Ingresa el código del depósito');
    }
    const deposit = await this.repo.findOne({ where: { storeId, code: normalized } });
    if (!deposit || deposit.status === ContainerDepositStatus.VOIDED) {
      throw new NotFoundException('No hay un depósito con ese código');
    }
    return serializeDeposit(deposit);
  }

  async refund(code: string, quantity: number | undefined, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const normalized = code.trim().toUpperCase();

    return this.dataSource.transaction(async (manager) => {
      const session = await manager.findOne(CashSession, {
        where: { storeId, userId, status: CashSessionStatus.OPEN },
      });
      if (!session) {
        throw new BadRequestException('Debes abrir la caja para devolver un depósito');
      }

      const deposit = await manager.findOne(ContainerDeposit, {
        where: { storeId, code: normalized },
        lock: { mode: 'pessimistic_write' },
      });
      if (!deposit || deposit.status === ContainerDepositStatus.VOIDED) {
        throw new NotFoundException('No hay un depósito con ese código');
      }
      if (deposit.status === ContainerDepositStatus.RETURNED) {
        throw new BadRequestException('Este depósito ya fue devuelto por completo');
      }

      const pendingCount = Number(deposit.containerCount) - Number(deposit.returnedCount);
      const qty = quantity ?? pendingCount;
      if (qty <= 0 || qty > pendingCount) {
        throw new BadRequestException(`Puedes devolver entre 1 y ${pendingCount} envase(s)`);
      }

      const unit = Number(deposit.unitAmount);
      const amount = Number((unit * qty).toFixed(2));
      const returnedCount = Number(deposit.returnedCount) + qty;
      const returnedAmount = Number((Number(deposit.returnedAmount) + amount).toFixed(2));
      const status = returnedCount >= Number(deposit.containerCount)
        ? ContainerDepositStatus.RETURNED
        : ContainerDepositStatus.PARTIAL;

      await manager.save(manager.create(ContainerDepositReturn, {
        depositId: deposit.id,
        cashSessionId: session.id,
        userId,
        quantity: qty,
        amount,
      }));

      deposit.returnedCount = returnedCount;
      deposit.returnedAmount = returnedAmount;
      deposit.status = status;
      await manager.save(deposit);

      return serializeDeposit(deposit);
    });
  }

  async refundsForSession(cashSessionId: number): Promise<number> {
    const row = await this.returnRepo
      .createQueryBuilder('r')
      .select('COALESCE(SUM(r.amount), 0)', 'total')
      .where('r.cashSessionId = :cashSessionId', { cashSessionId })
      .getRawOne<{ total: string }>();
    return Number(Number(row?.total ?? 0).toFixed(2));
  }

  static depositTotalsFromSale(
    dto: CreateSaleDto,
    products: Product[],
  ): { containerCount: number; unitAmount: number; totalAmount: number } | null {
    let containerCount = 0;
    let totalAmount = 0;

    for (const item of dto.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product || !item.selectedOptionIds?.length) continue;
      let perItem = 0;
      let hasDeposit = false;
      for (const group of product.optionGroups ?? []) {
        if (group.kind !== OptionGroupKind.ADDON) continue;
        for (const option of group.options ?? []) {
          if (item.selectedOptionIds.includes(option.id) && option.isDeposit) {
            hasDeposit = true;
            perItem += Number(option.unitPrice ?? 0);
          }
        }
      }
      if (hasDeposit && perItem > 0) {
        containerCount += item.quantity;
        totalAmount += perItem * item.quantity;
      }
    }

    if (containerCount <= 0 || totalAmount <= 0) return null;
    return {
      containerCount,
      totalAmount: Number(totalAmount.toFixed(2)),
      unitAmount: Number((totalAmount / containerCount).toFixed(2)),
    };
  }

  async createForSale(
    manager: EntityManager,
    sale: Sale,
    totals: { containerCount: number; unitAmount: number; totalAmount: number },
  ) {
    const code = await this.nextCode(manager, sale.storeId);
    return manager.save(manager.create(ContainerDeposit, {
      storeId: sale.storeId,
      code,
      saleId: sale.id,
      cashSessionId: sale.cashSessionId,
      containerCount: totals.containerCount,
      unitAmount: totals.unitAmount,
      totalAmount: totals.totalAmount,
      returnedCount: 0,
      returnedAmount: 0,
      status: ContainerDepositStatus.OPEN,
    }));
  }

  async voidForSale(manager: EntityManager, saleId: number, storeId: number) {
    const deposit = await manager.findOne(ContainerDeposit, { where: { saleId, storeId } });
    if (!deposit) return;
    if (Number(deposit.returnedCount) > 0) {
      throw new BadRequestException('No se puede anular: ya se devolvió parte del depósito de envases');
    }
    deposit.status = ContainerDepositStatus.VOIDED;
    await manager.save(deposit);
  }

  private async nextCode(manager: EntityManager, storeId: number): Promise<string> {
    for (let i = 0; i < 12; i++) {
      let code = '';
      for (let n = 0; n < 6; n++) {
        code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
      }
      const exists = await manager.findOne(ContainerDeposit, { where: { storeId, code } });
      if (!exists) return code;
    }
    throw new BadRequestException('No se pudo generar un código de depósito');
  }
}
