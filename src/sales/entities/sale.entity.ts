import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { PaymentMethod } from '../../common/enums';
import { Store } from '../../stores/entities/store.entity';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { CashSession } from '../../cash-sessions/entities/cash-session.entity';
import { SaleItem } from './sale-item.entity';

@Entity('sales')
@Unique(['storeId', 'ticketNumber'])
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ name: 'ticket_number', length: 30 })
  ticketNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ name: 'tax_amount', type: 'decimal', precision: 12, scale: 2 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  profit: number;

  @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod: PaymentMethod;

  @Column({ name: 'amount_paid', type: 'decimal', precision: 12, scale: 2, nullable: true })
  amountPaid: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  change: number;

  @Column({ name: 'customer_id', nullable: true })
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.sales, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'cash_session_id' })
  cashSessionId: number;

  @ManyToOne(() => CashSession, (session) => session.sales)
  @JoinColumn({ name: 'cash_session_id' })
  cashSession: CashSession;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
