import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../../common/enums';
import { Store } from '../../stores/entities/store.entity';
import { CashSession } from '../../cash-sessions/entities/cash-session.entity';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CASHIER })
  role: UserRole;

  @Column({ name: 'store_id', nullable: true })
  storeId: number | null;

  @ManyToOne(() => Store, (store) => store.users, { nullable: true })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => CashSession, (session) => session.user)
  cashSessions: CashSession[];

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
