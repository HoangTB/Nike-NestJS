import axiosClient from "../api/AxiosClient";
export interface IOrder {
  id?: number;
  status?: number;
  order_date?: Date | string;
  user_id?: number;
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
}
