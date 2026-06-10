import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InventoryMovementType } from '../../common/enums';
import { Store } from '../../stores/entities/store.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity('inventory_movements')
export class InventoryMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.movements)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'enum', enum: InventoryMovementType })
  type: InventoryMovementType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'stock_before', type: 'int' })
  stockBefore: number;

  @Column({ name: 'stock_after', type: 'int' })
  stockAfter: number;

  @Column({ type: 'text', nullable: true })
  reference: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
