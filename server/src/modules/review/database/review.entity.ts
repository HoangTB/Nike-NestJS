import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Users } from '../../users/database/users.entity';
import { Products } from '../../products/database/product.entity';
@Entity('Reviews')
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @Column()
  star: number;
  @Column()
  product_id: number;
  @Column()
  user_id: number;
  @ManyToOne(() => Users, (user) => user.Review)
  @JoinColumn({ name: 'user_id' })
  User: Users;
  @ManyToOne(() => Products, (product) => product.Review)
  @JoinColumn({ name: 'product_id' })
  Product: Products;
}
