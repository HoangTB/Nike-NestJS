import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Users } from '../../users/database/users.entity';
import { Products } from '../../products/database/product.entity';
@Entity('Favorites')
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column()
  product_id: number;
  @ManyToOne(() => Users, (user) => user.Favorite)
  @JoinColumn({ name: 'user_id' })
  User: Users;
  @ManyToOne(() => Products, (product) => product.Favorite)
  @JoinColumn({ name: 'product_id' })
  Product: Products;
}
