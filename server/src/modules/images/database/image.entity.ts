import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from '../../products/database/product.entity';

@Entity('Images')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_1: string;
  @Column()
  image_2: string;
  @Column()
  image_3: string;
  @Column()
  image_4: string;
  @Column()
  product_id: number;
  @OneToOne(() => Products, (product) => product.Image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  Product: Products;
}
