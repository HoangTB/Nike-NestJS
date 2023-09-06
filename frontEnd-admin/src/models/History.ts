import axiosClient from "../api/AxiosClient";
import { IStatusValue } from "../types/Type";
import { IProducts } from "./Product";

export interface IOrder {
  id: number;
  status: number;
  order_date: Date;
  user_id: number;
}
export interface IHistory {
  id?: number;
  quantity?: number;
  size_product?: string;
  fullName?: string;
  email?: string;
  address?: string;
  phone?: string;
  status?: number;
  order_date?: Date;
  order_id?: number;
  product_id?: number;
  Product?: IProducts;
  Order?: IOrder;
}

export class HistoryAPIServer {
  static getHistoryIdOrder(id: number): Promise<IHistory> {
    const url: string = `/api/v1/history/get-orderID/${id}`;
    return axiosClient.get(url);
  }

  static getAllHistoryIdOrder(): Promise<Array<IHistory>> {
    const url: string = "/api/v1/history/get-orderID/";
    return axiosClient.get(url);
  }
  static updateHistoryStatus(id: number, params: IStatusValue) {
    const url: string = `/api/v1/history/update/${id}`;
    return axiosClient.patch(url, params);
  }
  static getHistoryWithMonth(params: string): Promise<Array<IHistory>> {
    const url: string = "/api/v1/history/get-month";
    return axiosClient.post(url, params);
  }
}
