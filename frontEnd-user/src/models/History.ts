import axiosClient from "../api/AxiosClient";
export interface IHistory {
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
  Product?: {
    name: string;
    type: string;
    image: string;
    price: number;
  };
}
export class HistoryAPI {
  static createHistory(params: IHistory): Promise<IHistory> {
    const url = "/api/v1/history";
    return axiosClient.post(url, params);
  }

  static getHistoryIdOrder(id: number): Promise<Array<IHistory>> {
    const url = `/api/v1/history/get-orderID/${id}`;
    return axiosClient.get(url);
  }
}
