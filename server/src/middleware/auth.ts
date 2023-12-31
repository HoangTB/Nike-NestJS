require('dotenv').config();
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckAuth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Lấy phần header 'Authorization' từ request
    const authHeader = req.header('Authorization');

    // Kiểm tra xem header 'Authorization' có tồn tại không
    if (!authHeader) {
      return res.sendStatus(401); // Unauthorized
    }
    // Kiểm tra xem header 'Authorization' có chứa từ khóa 'Bearer' không
    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.sendStatus(401); // Unauthorized
    }
    const token = tokenParts[1];

    // Giải mã token và kiểm tra tính hợp lệ
    jwt.verify(token, process.env.secretKey, (err, user): void => {
      if (err) {
        res.status(403).json('Token is not valid');
      } else {
        // Lưu thông tin người dùng vào request để sử dụng ở middleware tiếp theo
        (req as any).user = user;
        // Cho phép request tiếp tục sang middleware hoặc route tiếp theo
        next();
      }
    });
  }
}
