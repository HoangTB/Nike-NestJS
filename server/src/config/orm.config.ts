import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Favorites } from '../modules/favorites/database/favorites.entity';
import { History } from '../modules/history/database/history.entity';
import { Images } from '../modules/images/database/image.entity';
import { Orders } from '../modules/order/database/order.entity';
import { OrderDetails } from '../modules/orderDetail/database/orderDetail.entity';
import { Products } from '../modules/products/database/product.entity';
import { Users } from '../modules/users/database/users.entity';
import { Reviews } from '../modules/review/database/review.entity';

require('dotenv').config();
export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Reviews,
    Favorites,
    History,
    Images,
    Orders,
    OrderDetails,
    Products,
    Users,
  ],
  synchronize: false,
};
