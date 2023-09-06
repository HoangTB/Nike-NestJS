export class LoginDTO {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  role?: number;
  status?: number;
}

export class UpdateUserDTO {
  id?: number;
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
