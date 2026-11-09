import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ContainerDepositStatus } from '../../common/enums';
import { Store } from '../../stores/entities/store.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { CashSession } from '../../cash-sessions/entities/cash-session.entity';
import { ContainerDepositReturn } from './container-deposit-return.entity';

@Entity('container_deposits')
@Unique(['storeId', 'code'])
@Index(['storeId', 'status'])
export class ContainerDeposit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ length: 12 })
  code: string;

  @Column({ name: 'sale_id' })
  saleId: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @Column({ name: 'cash_session_id' })
  cashSessionId: number;

  @ManyToOne(() => CashSession)
  @JoinColumn({ name: 'cash_session_id' })
  cashSession: CashSession;

  @Column({ name: 'container_count', type: 'int' })
  containerCount: number;

  @Column({ name: 'unit_amount', type: 'decimal', precision: 12, scale: 2 })
  unitAmount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ name: 'returned_count', type: 'int', default: 0 })
  returnedCount: number;

  @Column({ name: 'returned_amount', type: 'decimal', precision: 12, scale: 2, default: 0 })
  returnedAmount: number;

  @Column({ type: 'enum', enum: ContainerDepositStatus, default: ContainerDepositStatus.OPEN })
  status: ContainerDepositStatus;

  @OneToMany(() => ContainerDepositReturn, (row) => row.deposit)
  returns: ContainerDepositReturn[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
