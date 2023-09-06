import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './database/orderDetail.entity';
import { OrderDetailController } from './orderDetail.controller';
import { OrderDetailService } from './orderDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
