import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OptionGroupKind } from '../../common/enums';
import { Product } from './product.entity';
import { ProductOption } from './product-option.entity';

@Entity('product_option_groups')
export class ProductOptionGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, (product) => product.optionGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: OptionGroupKind })
  kind: OptionGroupKind;

  @Column({ name: 'min_select', type: 'int', default: 1 })
  minSelect: number;

  @Column({ name: 'max_select', type: 'int', default: 1 })
  maxSelect: number;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @OneToMany(() => ProductOption, (option) => option.group, { cascade: true })
  options: ProductOption[];
}
