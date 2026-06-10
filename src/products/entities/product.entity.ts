import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Category } from '../../categories/entities/category.entity';
import { InventoryMovement } from '../../inventory/entities/inventory-movement.entity';
import { SaleItem } from '../../sales/entities/sale-item.entity';
import { PurchaseItem } from '../../purchases/entities/purchase-item.entity';

@Entity('products')
@Unique(['storeId', 'sku'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ length: 50 })
  sku: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'sale_price', type: 'decimal', precision: 12, scale: 2 })
  salePrice: number;

  @Column({ name: 'cost_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  costPrice: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'min_stock', type: 'int', default: 5 })
  minStock: number;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => InventoryMovement, (movement) => movement.product)
  movements: InventoryMovement[];

  @OneToMany(() => SaleItem, (item) => item.product)
  saleItems: SaleItem[];

  @OneToMany(() => PurchaseItem, (item) => item.product)
  purchaseItems: PurchaseItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
