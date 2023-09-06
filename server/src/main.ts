import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
require('dotenv').config();
const PORT = process.env.APP_PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Lấy cookies từ Request
  app.use(morgan('dev'));
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}
bootstrap();
