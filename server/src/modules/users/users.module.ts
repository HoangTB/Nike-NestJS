import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './database/users.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { CheckAuth } from '../../middleware/auth';
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuth).forRoutes(
      {
        path: 'api/v1/users',
        method: RequestMethod.GET,
      },
      {
        path: 'api/v1/users/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'api/v1/users/order/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'api/v1/users/refresh-token',
        method: RequestMethod.POST,
      },
      {
        path: 'api/v1/users/update-user/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'api/v1/users/update-status/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'api/v1/users/update-role/:id',
        method: RequestMethod.PATCH,
      },
    );
    // .forRoutes(UserController);
  }
}
