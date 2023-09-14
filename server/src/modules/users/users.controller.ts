import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Res,
  Req,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './database/users.entity';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LoginDTO, RegisterDTO, UpdateUserDTO } from './dto/user.dto';
import { multerUpload } from '../../utils/multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('/api/v1/users')
export class UserController {
  constructor(
    private readonly UserService: UsersService,
    @InjectRepository(Users)
    private UserRepo: Repository<Users>,
  ) {}
  @Get()
  getUser() {
    return this.UserService.getUser();
  }
  @Get('/get-order')
  getUserOrder() {
    return this.UserService.getUserOrder();
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
  createUser(@Body() data: RegisterDTO) {
    return this.UserService.createUser(data);
  }
  @Post('/login')
  loginUser(@Body() data: LoginDTO, @Res() res: Response) {
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
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], multerUpload),
  )
  async updateUser(
    @UploadedFiles() files: any,
    @Body() data: UpdateUserDTO,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const user = await this.UserRepo.findOneBy({ id });
    if (files && files.avatar) {
      data.avatar = files.avatar[0].path;
    } else {
      data.avatar = user.avatar;
    }
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
  @Patch('update-avatar/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], multerUpload),
  )
  updateAvatar(
    @UploadedFiles() files: any,
    @Body() data: UpdateUserDTO,
    @Param('id') id: number,
  ) {
    console.log(22, files);
    if (files.avatar) {
      data.avatar = files.avatar[0].path;
    }
    return this.UserService.updateAvatar(id, data);
  }
}
