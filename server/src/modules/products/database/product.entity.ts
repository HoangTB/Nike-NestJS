import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Images } from '../../images/database/image.entity';
import { History } from '../../history/database/history.entity';
import { Favorites } from '../../favorites/database/favorites.entity';
import { OrderDetails } from '../../orderDetail/database/orderDetail.entity';
import { Reviews } from '../../review/database/review.entity';

@Entity('Products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: string;
  @Column()
  image: string;
  @Column()
  price: number;
  @Column()
  new: number;
  @Column()
  quantity_inventory: number;
  @Column({ default: 0 })
  status: number;
  @OneToOne(() => Images, (image) => image.Product, { onDelete: 'CASCADE' })
  Image: Images;
  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.Product)
  OrderDetail: OrderDetails[];
  @OneToMany(() => History, (history) => history.Product)
  History: History[];
  @OneToMany(() => Favorites, (favorites) => favorites.Product)
  Favorite: Favorites[];
  @OneToMany(() => Reviews, (review) => review.Product)
  Review: Reviews[];
}
