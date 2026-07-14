import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableOrderStatus } from '../../common/enums';
import { Customer } from '../../customers/entities/customer.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Store } from '../../stores/entities/store.entity';
import { User } from '../../users/entities/user.entity';
import { RestaurantTable } from './restaurant-table.entity';
import { TableOrderItem } from './table-order-item.entity';

@Entity('table_orders')
export class TableOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ name: 'table_id' })
  tableId: number;

  @ManyToOne(() => RestaurantTable, (table) => table.orders)
  @JoinColumn({ name: 'table_id' })
  table: RestaurantTable;

  @Column({ type: 'enum', enum: TableOrderStatus, default: TableOrderStatus.OPEN })
  status: TableOrderStatus;

  @Column({ name: 'customer_id', type: 'int', nullable: true })
  customerId: number | null;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'opened_by_user_id' })
  openedByUserId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'opened_by_user_id' })
  openedByUser: User;

  @Column({ name: 'closed_by_user_id', type: 'int', nullable: true })
  closedByUserId: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'closed_by_user_id' })
  closedByUser: User | null;

  @Column({ name: 'sale_id', type: 'int', nullable: true })
  saleId: number | null;

  @ManyToOne(() => Sale, { nullable: true })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale | null;

  @OneToMany(() => TableOrderItem, (item) => item.order, { cascade: true })
  items: TableOrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
