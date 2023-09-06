import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Products } from '../../products/database/product.entity';
import { Orders } from '../../order/database/order.entity';

@Entity('OrderDetails')
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 1 })
  quantity: number;
  @Column()
  size_product: string;
  @Column()
  product_id: number;
  @Column()
  order_id: number;
  @ManyToOne(() => Products, (products) => products.OrderDetail)
  @JoinColumn({ name: 'product_id' })
  Product: Products;
  @ManyToOne(() => Orders, (order) => order.OrderDetail)
  @JoinColumn({ name: 'order_id' })
  Order: Orders;
}
