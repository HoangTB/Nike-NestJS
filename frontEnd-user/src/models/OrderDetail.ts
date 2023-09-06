import axiosClient from "../api/AxiosClient";
export interface IOrderDetail {
  id?: number;
  quantity?: number;
  size_product?: string;
  product_id?: number;
  order_id?: number;
}

export interface IUpdateOrderDetail {
  quantity: number;
}

export interface IUpdateQuantity {
  quantity?: number;
  size_product?: string;
}
export class OrderDetail {
  static getOrderDetailById(id: number): Promise<Array<IOrderDetail>> {
    const url = `api/v1/order-detail/${id}`;
    return axiosClient.get(url);
  }

  static postOrderDetail(params: IOrderDetail): Promise<any> {
    const url = "/api/v1/order-detail";
    return axiosClient.post(url, params);
  }
  static updateOrderDetail(
    id: number,
    params: IUpdateOrderDetail
  ): Promise<any> {
    const url = `api/v1/order-detail/update/${id}`;
    return axiosClient.patch(url, params);
  }

  static updateQuantity(id: number, params: IUpdateQuantity): Promise<any> {
    const url = `api/v1/order-detail/quantity/${id}`;
    return axiosClient.patch(url, params);
  }

  static deleteOrderDetail(id: number) {
    const url = `api/v1/order-detail/delete/${id}`;
    return axiosClient.delete(url);
  }
  static deleteOrderDetailByHistory(id: number) {
    const url = `api/v1/order-detail/delete-history/${id}`;
    return axiosClient.delete(url);
  }
}
