import axiosClient from "../api/AxiosClient";

export interface IProducts {
  id?: number;
  name?: string;
  type?: string;
  image?: string;
  price?: number;
  new?: number;
  quantity_inventory?: number;
  Images?: any[];
}

export interface IProductMerger {
  product_id?: number;
  quantity?: number;
  size_product?: string;
  Product?: {
    name?: string;
    type?: string;
    image?: string;
    price?: number;
  };
}

export class Products {
  static getProduct(): Promise<Array<IProducts>> {
    const url = "api/v1/products";
    return axiosClient.get(url);
  }
  static searchProduct(params: any): Promise<Array<IProducts>> {
    const url = "api/v1/products/search";
    return axiosClient.get(url, { params });
  }
  static getProductById(id: number): Promise<IProducts> {
    const url = `api/v1/products/${id}`;
    return axiosClient.get(url);
  }
  static getProductMerger(id: number): Promise<IProductMerger> {
    const url = `api/v1/products/order-orderDetail/${id}`;
    return axiosClient.get(url);
  }

  static updateProduct(id: number, params: number) {
    const url = `api/v1/products/update/${id}`;
    return axiosClient.patch(url, params);
  }
}
