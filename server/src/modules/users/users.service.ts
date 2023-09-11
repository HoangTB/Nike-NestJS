import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './database/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { LoginDTO, RegisterDTO, UpdateUserDTO } from './dto/user.dto';
require('dotenv').config();
let refreshTokenArr: string[] = [];
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private UserRepo: Repository<Users>,
  ) {}
  async getUser(): Promise<LoginDTO[]> {
    try {
      const users = await this.UserRepo.find();
      return users;
    } catch (err) {
      return err;
    }
  }
  async getUserId(id: number): Promise<LoginDTO> {
    try {
      const userFind = await this.UserRepo.findOneBy({ id });
      return userFind;
    } catch (err) {
      return err;
    }
  }

  async getUserIdOrder(id: number): Promise<LoginDTO> {
    try {
      const userOrder = await this.UserRepo.findOne({
        where: { id },
        relations: ['Order'],
      });
      return userOrder;
    } catch (err) {
      return err;
    }
  }

  async createUser(data: RegisterDTO): Promise<{
    message?: string;
  }> {
    const { email, password, firstName, lastName, birthday } = data;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.UserRepo.findOne({ where: { email } });

    if (existingUser) {
      return { message: 'Email already exists' };
    }

    // Hash mật khẩu trước khi lưu vào database
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo một user mới
    const user = this.UserRepo.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthday,
    });

    try {
      await this.UserRepo.save(user);
      return { message: 'Create User Successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }

  async loginUser(data: LoginDTO, res: Response): Promise<any> {
    const { email, password } = data;
    const user = await this.UserRepo.findOne({ where: { email } });
    try {
      if (user) {
        const myPass = await bcrypt.compare(password, user.password);
        if (myPass) {
          const accessToken = jwt.sign(
            { password: user.password },
            process.env.secretKey,
            {
              expiresIn: '180s',
            },
          );

          const refreshToken = jwt.sign(
            { user: user },
            process.env.secretKeyRefresh,
            {
              expiresIn: '365d',
            },
          );
          // Tạo refreshToken để dự trữ
          refreshTokenArr.push(refreshToken);

          const { password, ...data } = user;
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          });
          res.status(200).json({
            user: data,
            accessToken,
          });
        } else {
          res.status(401).json({ message: 'Password was wrong' });
        }
      } else {
        // Nếu sai thì báo lỗi
        res.status(401).json({ message: 'Email or password does not exist !' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const refreshToken = req.cookies.refreshToken;

      // console.log('refreshToken', refreshToken);
      // console.log('refreshTokenArr-2', refreshTokenArr);

      if (!refreshToken) return res.status(401).json('Unauthenticated-1');
      if (!refreshTokenArr.includes(refreshToken)) {
        return res.status(401).json('Unauthenticated-2');
      }
      jwt.verify(
        refreshToken,
        process.env.secretKeyRefresh,
        (err: any, user: any) => {
          if (err) {
            return res.status(400).json('refreshToken is not valid');
          }
          const { iat, exp, ...userOther } = user;
          refreshTokenArr = refreshTokenArr.filter(
            (token: string) => token !== refreshToken,
          );
          const newAccessToken = jwt.sign(userOther, process.env.secretKey, {
            expiresIn: '180s',
          });
          const newRefreshToken = jwt.sign(
            userOther,
            process.env.secretKeyRefresh,
            {
              expiresIn: '365d',
            },
          );
          refreshTokenArr.push(newRefreshToken);

          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          });
          return res.status(200).json(newAccessToken);
        },
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    refreshTokenArr = refreshTokenArr.filter(
      (token: string) => token !== req.cookies.refreshToken,
    );
    res.status(200).json('Logout Successfully');
  }

  async updateUser(
    data: UpdateUserDTO,
    id: number,
    res: Response,
  ): Promise<void> {
    try {
      const {
        avatar,
        email,
        firstName,
        lastName,
        birthday,
        oldPass,
        newPass,
        confirmPass,
      } = data;

      const user = await this.UserRepo.findOne({ where: { email } });

      if (oldPass && newPass && confirmPass) {
        if (newPass === confirmPass) {
          if (confirmPass.length >= 5) {
            if (user) {
              const myPass = await bcrypt.compare(oldPass, user.password);
              if (myPass) {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(newPass, salt);
                const result = {
                  avatar: avatar ? avatar : user.avatar,
                  firstName: firstName,
                  lastName: lastName,
                  birthday: birthday,
                  password: hashedPassword,
                };
                await this.UserRepo.update(id, result);
                res
                  .status(200)
                  .json({ message: 'Update User and Password Successfully' });
              } else {
                res.status(401).json({
                  message: 'The new password does not match the old password',
                });
              }
            }
          } else {
            res.status(400).json({ message: 'Password is too short' });
          }
        } else {
          res.status(400).json({ message: 'Confirm Password do not match' });
        }
      } else {
        const result = {
          avatar: avatar ? avatar : user.avatar,
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
        };

        await this.UserRepo.update(id, result);
        res.status(200).json({ message: 'Updated User successfully' });
      }
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  async updateStatusByAdmin(id: number, res: Response): Promise<void> {
    try {
      const currentUser = await this.UserRepo.findOneBy({
        id,
      });

      if (currentUser) {
        const newStatus = currentUser.status === 1 ? 2 : 1;
        await this.UserRepo.update(id, {
          status: newStatus,
        });
        res.status(200).json({ message: 'Update successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  async updateRoleByAdmin(id: number, res: Response): Promise<void> {
    try {
      const currentUser = await this.UserRepo.findOneBy({
        id,
      });

      if (currentUser) {
        const newRole = currentUser.role === 1 ? 2 : 1;
        await this.UserRepo.update(id, { role: newRole });
        res.status(200).json({ message: 'Update successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  async updateAvatar(
    id: number,
    data: UpdateUserDTO,
  ): Promise<{ message: string }> {
    try {
      const FindUser = await this.UserRepo.findOneBy({ id });
      if (FindUser) {
        await this.UserRepo.update(id, data);
        return { message: 'Update successfully' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
}
