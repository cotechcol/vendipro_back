import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Store } from '../../stores/entities/store.entity';

@Entity('settings')
@Unique(['storeId'])
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => Store, (store) => store.settings)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column({ name: 'business_name', length: 200, default: 'Mi Negocio' })
  businessName: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 4, default: 0.16 })
  taxRate: number;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl: string;

  @Column({ length: 3, default: 'COP' })
  currency: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
