import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../users/database/users.entity';
import { OrderDetails } from '../../orderDetail/database/orderDetail.entity';
import { History } from '../../history/database/history.entity';

@Entity('Orders')
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 1 })
  status: number;
  @Column()
  order_date: Date;
  @Column()
  user_id: number;
  @OneToOne(() => Users, (users) => users.Order)
  @JoinColumn({ name: 'user_id' })
  User: Users;
  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.Order)
  OrderDetail: OrderDetails[];
  @OneToMany(() => History, (history) => history.Order)
  History: History[];
}
