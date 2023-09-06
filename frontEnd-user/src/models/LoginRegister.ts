import axios from "axios";
import axiosClient from "../api/AxiosClient";
export interface ILoginUser {
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
      birthday: string;
      role: number;
      status: number;
    };
    accessToken: string;
  };
}

export interface IRegister {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  role?: number;
  status?: number;
}
export class UserAPI {
  static register(param: IRegister): Promise<any> {
    const url = "http://localhost:8080/api/v1/users/register";

    return axios.post(url, param);
  }
  static login(param: ILoginUser): Promise<any> {
    const url = "http://localhost:8080/api/v1/users/login";
    return axios.post(url, param, { withCredentials: true });
  }

  static getUserId(id: number) {
    const url = `http://localhost:8080/api/v1/users/${id}/`;
    return axios.get(url);
  }
  static getUserIdOrder(id: number) {
    const url = `api/v1/users/order/${id}/`;
    return axiosClient.get(url);
  }
  static updateUser(id: number, param: IRegister) {
    const url = `http://localhost:8080/api/v1/users/update-user/${id}`;
    return axios.patch(url, param);
  }
  static deleteCookie() {
    const url = `api/v1/users/logout`;
    return axiosClient.post(url);
  }
}
