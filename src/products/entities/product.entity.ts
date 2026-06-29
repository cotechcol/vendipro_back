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
import { ProductType, StockUnit } from '../../common/enums';
import { Store } from '../../stores/entities/store.entity';
import { Category } from '../../categories/entities/category.entity';
import { InventoryMovement } from '../../inventory/entities/inventory-movement.entity';
import { SaleItem } from '../../sales/entities/sale-item.entity';
import { PurchaseItem } from '../../purchases/entities/purchase-item.entity';
import { ProductRecipe } from './product-recipe.entity';
import { ProductOptionGroup } from './product-option-group.entity';

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

  /** Ruta del objeto en Supabase Storage (bucket imagenes) */
  @Column({ name: 'image_key', type: 'varchar', length: 500, nullable: true })
  imageKey: string | null;

  @Column({ name: 'product_type', type: 'enum', enum: ProductType, default: ProductType.SIMPLE })
  productType: ProductType;

  @Column({ name: 'stock_unit', type: 'enum', enum: StockUnit, default: StockUnit.UNIT })
  stockUnit: StockUnit;

  @Column({ name: 'base_product_id', nullable: true })
  baseProductId: number | null;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'base_product_id' })
  baseProduct: Product | null;

  /** Gramos/ml descontados del insumo base por cada unidad vendida */
  @Column({ name: 'portion_size', type: 'decimal', precision: 12, scale: 3, nullable: true })
  portionSize: number | null;

  /** Bolas de helado cuando el producto usa opciones de sabor (máximo si variableScoops) */
  @Column({ name: 'scoop_count', type: 'int', nullable: true })
  scoopCount: number | null;

  /** Si true, el cliente elige 1..scoopCount bolas al vender (un solo producto en POS) */
  @Column({ name: 'variable_scoops', default: false })
  variableScoops: boolean;

  /** Precios por cantidad de bolas: [1 bola, 2 bolas, 3 bolas…] */
  @Column({ name: 'scoop_prices', type: 'json', nullable: true })
  scoopPrices: number[] | null;

  @Column({ name: 'sale_price', type: 'decimal', precision: 12, scale: 2 })
  salePrice: number;

  @Column({ name: 'cost_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  costPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 3, default: 0 })
  stock: number;

  @Column({ name: 'min_stock', type: 'decimal', precision: 12, scale: 3, default: 0 })
  minStock: number;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ default: true })
  active: boolean;

  /** Si aparece en el punto de venta (insumos bulk suelen ir en false) */
  @Column({ name: 'visible_in_pos', default: true })
  visibleInPos: boolean;

  @OneToMany(() => ProductRecipe, (recipe) => recipe.product)
  recipe: ProductRecipe[];

  @OneToMany(() => ProductOptionGroup, (group) => group.product)
  optionGroups: ProductOptionGroup[];

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
