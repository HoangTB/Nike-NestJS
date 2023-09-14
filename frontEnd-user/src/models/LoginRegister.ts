import axios from "axios";
import axiosClient from "../api/AxiosClient";
import { IOrder } from "./Order";
import AxiosClientFormData from "../api/AxiosClientFormData";
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

export interface IUser {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  role?: number;
  status?: number;
  Order?: IOrder;
}
export class UserAPI {
  static register(param: IRegister): Promise<any> {
    const url = "https://server-0169.onrender.com/api/v1/users/register";

    return axios.post(url, param);
  }
  static login(param: ILoginUser): Promise<any> {
    const url = "https://server-0169.onrender.com/api/v1/users/login";
    return axios.post(url, param, { withCredentials: true });
  }

  static getUserId(id: number) {
    const url = `https://server-0169.onrender.com/api/v1/users/${id}`;
    return axiosClient.get(url);
  }
  static getUserIdOrder(id: number) {
    const url = `api/v1/users/order/${id}/`;
    return axiosClient.get(url);
  }
  static updateUser(id: number, param: IRegister) {
    const url = `api/v1/users/update-user/${id}`;
    return AxiosClientFormData.patch(url, param);
  }
  static deleteCookie() {
    const url = `api/v1/users/logout`;
    return axiosClient.post(url);
  }
}
