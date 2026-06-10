import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashSession } from './entities/cash-session.entity';
import { Sale } from '../sales/entities/sale.entity';
import { OpenCashSessionDto, CloseCashSessionDto } from './dto/cash-session.dto';
import { CashSessionStatus, PaymentMethod, UserRole } from '../common/enums';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class CashSessionsService {
  constructor(
    @InjectRepository(CashSession) private repo: Repository<CashSession>,
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async getCurrent(userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const session = await this.repo.findOne({
      where: { storeId, userId, status: CashSessionStatus.OPEN },
      relations: ['user'],
    });
    if (!session) return null;
    const summary = await this.getSessionSummary(session.id);
    return { ...session, summary };
  }

  async open(dto: OpenCashSessionDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const existing = await this.repo.findOne({
      where: { storeId, userId, status: CashSessionStatus.OPEN },
    });
    if (existing) {
      throw new BadRequestException('Ya tienes una caja abierta');
    }
    const session = await this.repo.save(
      this.repo.create({
        openingAmount: dto.openingAmount,
        userId,
        storeId,
        status: CashSessionStatus.OPEN,
      }),
    );
    const summary = await this.getSessionSummary(session.id);
    return { ...session, summary };
  }

  async close(id: number, dto: CloseCashSessionDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const session = await this.repo.findOne({ where: { id, storeId, userId } });
    if (!session) throw new NotFoundException('Sesión de caja no encontrada');
    if (session.status === CashSessionStatus.CLOSED) {
      throw new BadRequestException('La caja ya está cerrada');
    }

    const summary = await this.getSessionSummary(id);
    const expectedAmount = Number(session.openingAmount) + summary.cashTotal;
    const difference = dto.closingAmount - expectedAmount;

    session.closingAmount = dto.closingAmount;
    session.expectedAmount = expectedAmount;
    session.difference = difference;
    session.status = CashSessionStatus.CLOSED;
    session.closedAt = new Date();
    session.notes = dto.notes || session.notes;

    return this.repo.save(session);
  }

  async findAll(query: PaginationDto, userId: number, role: UserRole, ctx: StoreContext) {
    const { page = 1, limit = 15 } = query;
    const storeId = this.scopeStore(ctx);
    const isAdmin = role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;
    const where = isAdmin ? { storeId } : { storeId, userId };

    const [sessions, total] = await this.repo.findAndCount({
      where,
      relations: ['user'],
      order: { openedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const data = await Promise.all(
      sessions.map(async (session) => ({
        ...session,
        summary: await this.getSessionSummary(session.id),
      })),
    );

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, userId: number, role: UserRole, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const session = await this.repo.findOne({
      where: { id, storeId },
      relations: ['user'],
    });
    if (!session) throw new NotFoundException('Sesión no encontrada');
    const isAdmin = role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;
    if (!isAdmin && session.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a esta sesión');
    }

    const summary = await this.getSessionSummary(id);
    const sales = await this.saleRepo.find({
      where: { cashSessionId: id },
      relations: ['customer', 'user'],
      order: { createdAt: 'DESC' },
    });

    return { session, summary, sales };
  }

  private async getSessionSummary(sessionId: number) {
    const sales = await this.saleRepo.find({ where: { cashSessionId: sessionId } });

    const totalSales = sales.length;
    const totalRevenue = sales.reduce((s, v) => s + Number(v.total), 0);
    const totalProfit = sales.reduce((s, v) => s + Number(v.profit), 0);
    const cashTotal = sales
      .filter((s) => [PaymentMethod.CASH, PaymentMethod.MIXED].includes(s.paymentMethod))
      .reduce((s, v) => s + Number(v.total), 0);
    const cardTotal = sales
      .filter((s) => s.paymentMethod === PaymentMethod.CARD)
      .reduce((s, v) => s + Number(v.total), 0);

    return {
      totalSales,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2)),
      cashTotal: Number(cashTotal.toFixed(2)),
      cardTotal: Number(cardTotal.toFixed(2)),
    };
  }
}
