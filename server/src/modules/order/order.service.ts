import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './database/order.entity';
import { OrderDTO } from './dto/order.dto';
import { Users } from '../users/database/users.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private OrderRepo: Repository<Orders>,
  ) {}
  async postOrder(data: OrderDTO): Promise<{ message: string }> {
    try {
      const existingOrder = await this.OrderRepo.findOneBy({
        user_id: data.user_id,
      });
      console.log(existingOrder);
      if (existingOrder == null) {
        const order = this.OrderRepo.create(data);
        await this.OrderRepo.save(order);
        return { message: 'Create Successfully' };
      } else {
        return { message: 'Order already exists' };
      }
    } catch (err) {
      return { message: err };
    }
  }
  async getOrder(): Promise<OrderDTO[] | { message: string }> {
    try {
      const order = await this.OrderRepo.find();
      return order;
    } catch (err) {
      return { message: err };
    }
  }
  async getOrderById(id: number): Promise<OrderDTO | { message: string }> {
    try {
      const orderFind = await this.OrderRepo.findOneBy({ user_id: id });
      return orderFind;
    } catch (err) {
      return { message: err };
    }
  }
  async getProductMergerId(id: number) {
    try {
      const orderFind = await this.OrderRepo.findOne({
        where: { id },
        relations: ['OrderDetail', 'OrderDetail.Product'],
      });
      return orderFind;
    } catch (err) {
      return { message: err };
    }
  }
}
