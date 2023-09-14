import axios from "axios";

export interface ILoginAdmin {
  email: string;
  password: string;
}

export interface ILogin {
  data: {
    user: {
      id: number;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      birthday: Date;
      role: number;
      status: number;
    };
    accessToken: string;
  };
}

export class Login {
  static async LoginAdmin(param: ILoginAdmin): Promise<ILogin> {
    const url: string = "http://localhost:8080/api/v1/users/login";
    const response: ILogin = await axios.post(url, param);

    return response;
  }
}
