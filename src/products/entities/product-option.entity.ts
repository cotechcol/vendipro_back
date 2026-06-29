import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StockUnit } from '../../common/enums';
import { Product } from './product.entity';
import { ProductOptionGroup } from './product-option-group.entity';

@Entity('product_options')
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @ManyToOne(() => ProductOptionGroup, (group) => group.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: ProductOptionGroup;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'ingredient_product_id', nullable: true })
  ingredientProductId: number | null;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'ingredient_product_id' })
  ingredient: Product | null;

  @Column({ type: 'decimal', precision: 12, scale: 3 })
  quantity: number;

  @Column({ type: 'enum', enum: StockUnit, default: StockUnit.G })
  unit: StockUnit;

  /** Costo para el negocio por usar esta opción (1 bola, 1 envase o 1 adicional) */
  @Column({ name: 'unit_cost', type: 'decimal', precision: 12, scale: 2, default: 0 })
  unitCost: number;

  /** Precio extra al cliente (solo adicionales en productos compuestos) */
  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  unitPrice: number;
}
