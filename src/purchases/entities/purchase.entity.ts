import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { User } from '../../users/entities/user.entity';
import { PurchaseItem } from './purchase-item.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ name: 'invoice_number', length: 50, nullable: true })
  invoiceNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'supplier_id' })
  supplierId: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PurchaseItem, (item) => item.purchase, { cascade: true })
  items: PurchaseItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
