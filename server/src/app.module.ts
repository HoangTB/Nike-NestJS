import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/product.module';
import { FavoriteModule } from './modules/favorites/favorites.module';
import { HistoryModule } from './modules/history/history.module';
import { ImageModule } from './modules/images/image.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/orderDetail/orderDetail.module';
import { UserModule } from './modules/users/users.module';
import { config } from './config/orm.config';
import { ReviewModule } from './modules/review/reviews.module';

@Module({
  imports: [
    ReviewModule,
    FavoriteModule,
    HistoryModule,
    ImageModule,
    OrderModule,
    OrderDetailModule,
    ProductModule,
    UserModule,
    TypeOrmModule.forRoot(config),
  ],
})
export class AppModule {}
