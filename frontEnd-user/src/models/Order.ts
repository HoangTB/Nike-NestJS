import axiosClient from "../api/AxiosClient";
import { IOrderDetail } from "./OrderDetail";
export interface IOrder {
  id?: number;
  status?: number;
  order_date?: Date;
  user_id?: number;
}
export interface IProductMerger {
  product_id?: number;
  quantity?: number;
  size_product?: string;
  OrderDetail?: IOrderDetail | undefined;
}

export class Order {
  static postOrder(params: IOrder): Promise<Array<IOrder>> {
    const url = "/api/v1/order";
    return axiosClient.post(url, params);
  }
  static getOrderById(id: number): Promise<IOrder> {
    const url = `/api/v1/order/${id}`;
    return axiosClient.get(url);
  }
  static getProductMerger(id: number): Promise<IProductMerger> {
    const url = `api/v1/order/order-orderDetail/${id}`;
    return axiosClient.get(url);
  }
}
