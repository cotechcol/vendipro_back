import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Setting } from '../../settings/entities/setting.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => User, (user) => user.store)
  users: User[];

  @OneToMany(() => Setting, (setting) => setting.store)
  settings: Setting[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
