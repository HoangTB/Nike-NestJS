import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterDTO {
  id?: number;
  avatar?: string;
  @IsEmail()
  email?: string;
  @IsNotEmpty()
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  role?: number;
  status?: number;
}

export class LoginDTO {
  @IsEmail()
  email?: string;
  @IsNotEmpty()
  password?: string;
}

export class UpdateUserDTO {
  id?: number;
  avatar?: string;
  email?: string;
  password?: string;
  oldPass?: string;
  newPass?: string;
  confirmPass?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  role?: number;
  status?: number;
}
