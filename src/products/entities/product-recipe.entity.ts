import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { StockUnit } from '../../common/enums';

@Entity('product_recipes')
export class ProductRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'ingredient_product_id' })
  ingredientProductId: number;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'ingredient_product_id' })
  ingredient: Product;

  @Column({ type: 'decimal', precision: 12, scale: 3 })
  quantity: number;

  @Column({ type: 'enum', enum: StockUnit, default: StockUnit.G })
  unit: StockUnit;
}
