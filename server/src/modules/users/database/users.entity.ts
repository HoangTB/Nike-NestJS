import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Favorites } from '../../favorites/database/favorites.entity';
import { Orders } from '../../order/database/order.entity';
import { Reviews } from '../../review/database/review.entity';
@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    default:
      'https://www.nike.com/static/dotcom-member/settings/_next/public/images/default_avatar.png',
  })
  avatar: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  birthday: Date;
  @Column({ default: 1 })
  role: number;
  @Column({ default: 1 })
  status: number;

  @OneToOne(() => Orders, (orders) => orders.User)
  Order: Orders;
  @OneToMany(() => Favorites, (favorites) => favorites.User)
  Favorite: Favorites[];
  @OneToMany(() => Reviews, (review) => review.User)
  Review: Reviews[];
}
