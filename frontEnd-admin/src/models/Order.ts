import axiosClient from "../api/AxiosClient";
import { IOrder } from "./History";

export class OrderAPIServer {
  static getOrder(): Promise<IOrder> {
    const url: string = "/api/v1/order";
    return axiosClient.get(url);
  }
}
