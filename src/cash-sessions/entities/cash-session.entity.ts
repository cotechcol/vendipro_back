import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CashSessionStatus } from '../../common/enums';
import { Store } from '../../stores/entities/store.entity';
import { User } from '../../users/entities/user.entity';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('cash_sessions')
export class CashSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ name: 'opening_amount', type: 'decimal', precision: 12, scale: 2 })
  openingAmount: number;

  @Column({ name: 'closing_amount', type: 'decimal', precision: 12, scale: 2, nullable: true })
  closingAmount: number;

  @Column({ name: 'expected_amount', type: 'decimal', precision: 12, scale: 2, nullable: true })
  expectedAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  difference: number;

  @Column({ type: 'enum', enum: CashSessionStatus, default: CashSessionStatus.OPEN })
  status: CashSessionStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.cashSessions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Sale, (sale) => sale.cashSession)
  sales: Sale[];

  @CreateDateColumn({ name: 'opened_at' })
  openedAt: Date;

  @Column({ name: 'closed_at', type: 'datetime', nullable: true })
  closedAt: Date;
}
