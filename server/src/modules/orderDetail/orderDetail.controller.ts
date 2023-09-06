import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetailDTO } from './dto/orderDetail.dto';

@Controller('/api/v1/order-detail')
export class OrderDetailController {
  constructor(private readonly OrderDetailService: OrderDetailService) {}
  @Post()
  postOrderDetail(@Body() data: OrderDetailDTO) {
    return this.OrderDetailService.postOrderDetail(data);
  }

  @Get('/:id')
  getOrderDetailById(@Param('id') id: number) {
    return this.OrderDetailService.getOrderDetailById(id);
  }

  @Patch('/quantity/:id')
  updateOrderDetailQuantity(
    @Param('id') id: number,
    @Body() data: OrderDetailDTO,
  ) {
    return this.OrderDetailService.updateOrderDetailQuantity(id, data);
  }
  @Patch('/update/:id')
  updateOrderDetailById(@Param('id') id: number, @Body() data: OrderDetailDTO) {
    return this.OrderDetailService.updateOrderDetailById(id, data);
  }
  @Delete('/delete/:id')
  deleteOrderDetail(@Param('id') id: number) {
    return this.OrderDetailService.deleteOrderDetail(id);
  }
  @Delete('/delete-history/:id')
  deleteOrderDetailByHistory(@Param('id') id: number) {
    return this.OrderDetailService.deleteOrderDetailByHistory(id);
  }
}
