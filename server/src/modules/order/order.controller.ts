import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('/api/v1/order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}
  @Post()
  postOrder(@Body() data: OrderDTO) {
    return this.OrderService.postOrder(data);
  }
  @Get()
  getOrder() {
    return this.OrderService.getOrder();
  }
  @Get('/:id')
  getOrderById(@Param('id') id: number) {
    return this.OrderService.getOrderById(id);
  }

  @Get('/order-orderDetail/:id')
  getProductMergerId(@Param('id') id: number) {
    return this.OrderService.getProductMergerId(id);
  }
}
