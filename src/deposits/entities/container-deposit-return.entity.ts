import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContainerDeposit } from './container-deposit.entity';
import { CashSession } from '../../cash-sessions/entities/cash-session.entity';
import { User } from '../../users/entities/user.entity';

@Entity('container_deposit_returns')
@Index(['cashSessionId'])
export class ContainerDepositReturn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'deposit_id' })
  depositId: number;

  @ManyToOne(() => ContainerDeposit, (deposit) => deposit.returns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deposit_id' })
  deposit: ContainerDeposit;

  @Column({ name: 'cash_session_id' })
  cashSessionId: number;

  @ManyToOne(() => CashSession)
  @JoinColumn({ name: 'cash_session_id' })
  cashSession: CashSession;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
