import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './database/users.entity';
import { Request, Response } from 'express';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly UserService: UsersService) {}
  @Get()
  getUser() {
    return this.UserService.getUser();
  }
  @Get('/:id')
  getUserId(@Param('id') id: number) {
    return this.UserService.getUserId(id);
  }
  @Get('/order/:id')
  getUserIdOrder(@Param('id') id: number) {
    return this.UserService.getUserIdOrder(id);
  }
  @Post('/register')
  createUser(@Body() data: Users) {
    return this.UserService.createUser(data);
  }
  @Post('/login')
  loginUser(@Body() data: Users, @Res() res: Response) {
    return this.UserService.loginUser(data, res);
  }

  @Post('/refresh-token')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.UserService.refreshToken(req, res);
  }
  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.UserService.logout(req, res);
  }

  @Patch('/update-user/:id')
  updateUser(
    @Body() data: Users,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    return this.UserService.updateUser(data, id, res);
  }
  @Patch('/update-status/:id')
  updateStatusByAdmin(@Param('id') id: number, @Res() res: Response) {
    return this.UserService.updateStatusByAdmin(id, res);
  }
  @Patch('/update-role/:id')
  updateRoleByAdmin(@Param('id') id: number, @Res() res: Response) {
    return this.UserService.updateRoleByAdmin(id, res);
  }
}
