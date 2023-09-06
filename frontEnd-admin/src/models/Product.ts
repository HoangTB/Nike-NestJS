import axiosClient from "../api/AxiosClient";

export interface IImage {
  id: number;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  product_id: number;
}
export interface IProducts {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  new: number;
  quantity_inventory: number;
  Images?: IImage;
}
export class ProductsServer {
  static getProduct(): Promise<Array<IProducts>> {
    const url: string = "api/v1/products";
    return axiosClient.get(url);
  }
  static getProductLast(): Promise<IProducts> {
    const url: string = "api/v1/products/last";
    return axiosClient.get(url);
  }

  static getProductById(id: number): Promise<IProducts> {
    const url: string = `api/v1/products/${id}`;
    return axiosClient.get(url);
  }

  static getProductMerger(id: number): Promise<IProducts> {
    const url: string = `api/v1/products/order-orderDetail/${id}`;
    return axiosClient.get(url);
  }

  static deleteProduct(id: number) {
    const url: string = `api/v1/products/delete/${id}`;
    return axiosClient.delete(url);
  }

  static updateProduct(
    id: number,
    params: IProducts
  ): Promise<Array<IProducts>> {
    const url: string = `api/v1/products/update/${id}`;
    return axiosClient.patch(url, params);
  }

  static createProductNotJson(params: IProducts): Promise<Array<IProducts>> {
    const url: string = "api/v1/products/admin-create";
    return axiosClient.post(url, params);
  }
}
