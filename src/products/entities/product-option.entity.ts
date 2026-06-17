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

  @Column({ name: 'ingredient_product_id' })
  ingredientProductId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ingredient_product_id' })
  ingredient: Product;

  @Column({ type: 'decimal', precision: 12, scale: 3 })
  quantity: number;

  @Column({ type: 'enum', enum: StockUnit, default: StockUnit.G })
  unit: StockUnit;

  /** Costo para el negocio por usar esta opción (1 bola o 1 envase) */
  @Column({ name: 'unit_cost', type: 'decimal', precision: 12, scale: 2, default: 0 })
  unitCost: number;
}
