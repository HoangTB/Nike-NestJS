import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from '../../order/database/order.entity';
import { Products } from '../../products/database/product.entity';
@Entity('History')
export class History {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @Column()
  size_product: string;
  @Column()
  fullName: string;
  @Column()
  email: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  status: number;
  @Column()
  order_date: Date;
  @Column()
  order_id: number;
  @Column()
  product_id: number;
  @ManyToOne(() => Orders, (order) => order.History)
  @JoinColumn({ name: 'order_id' })
  Order: Orders;
  @ManyToOne(() => Products, (product) => product.History)
  @JoinColumn({ name: 'product_id' })
  Product: Products;
}
