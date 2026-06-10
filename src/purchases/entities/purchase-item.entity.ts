import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('purchase_items')
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_id' })
  purchaseId: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.purchaseItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'unit_cost', type: 'decimal', precision: 12, scale: 2 })
  unitCost: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;
}
