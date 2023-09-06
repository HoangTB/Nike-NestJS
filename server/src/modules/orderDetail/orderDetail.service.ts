import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './database/orderDetail.entity';
import { OrderDetailDTO } from './dto/orderDetail.dto';
import { Users } from '../users/database/users.entity';
@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetails)
    private OrderDetailRepo: Repository<OrderDetails>,
  ) {}
  async getOrderDetailById(
    id: number,
  ): Promise<OrderDetailDTO[] | { message: string }> {
    try {
      const orderDetail = await this.OrderDetailRepo.find({
        where: { order_id: id },
      });
      return orderDetail;
    } catch (error) {
      return { message: error.message };
    }
  }
  async postOrderDetail(data: OrderDetailDTO): Promise<{ message: string }> {
    try {
      const orderDetail = this.OrderDetailRepo.create(data);
      await this.OrderDetailRepo.save(orderDetail);
      return { message: 'Create Successfully' };
    } catch (error) {
      return { message: error };
    }
  }
  async updateOrderDetailQuantity(
    id: number,
    data: OrderDetailDTO,
  ): Promise<{ message: string }> {
    try {
      const orderDetail = await this.OrderDetailRepo.findOneBy({
        product_id: id,
      });
      if (orderDetail) {
        await this.OrderDetailRepo.update({ product_id: id }, data);
        return { message: 'Update Quantity and Size Successfully' };
      } else {
        return { message: 'OrderDetail not exist' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
  async updateOrderDetailById(
    id: number,
    data: OrderDetailDTO,
  ): Promise<{ message: string }> {
    try {
      const orderDetail = await this.OrderDetailRepo.findOneBy({
        product_id: id,
      });
      if (orderDetail) {
        await this.OrderDetailRepo.update({ product_id: id }, data);
        return { message: 'Update Quantity Successfully' };
      } else {
        return { message: 'OrderDetail not exist' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
  async deleteOrderDetail(id: number): Promise<{ message: string }> {
    try {
      const orderDetail = await this.OrderDetailRepo.findOneBy({
        product_id: id,
      });
      console.log(orderDetail);

      if (orderDetail) {
        await this.OrderDetailRepo.delete({ product_id: id });
        return { message: 'Delete OrderDetail Successfully' };
      } else {
        return { message: 'Product is not exist' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
  async deleteOrderDetailByHistory(id: number): Promise<{ message: string }> {
    try {
      const orderDetail = await this.OrderDetailRepo.findOneBy({
        order_id: id,
      });

      if (orderDetail) {
        await this.OrderDetailRepo.delete({ order_id: id });
        return { message: 'Delete OrderDetail Successfully' };
      } else {
        return { message: 'Order ID not exist' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
}
