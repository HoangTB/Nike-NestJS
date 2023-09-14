import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common/pipes';
require('dotenv').config();
const PORT = process.env.APP_PORT;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOrigin = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://nike-user.onrender.com',
    'https://nike-admin-7utd.onrender.com',
  ];
  const corsOptions = {
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  // Lấy cookies từ Request
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}
bootstrap();
