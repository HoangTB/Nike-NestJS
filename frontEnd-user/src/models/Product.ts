import axiosClient from "../api/AxiosClient";

export interface IImage {
  id?: number;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  product_id?: number;
}

export interface IProducts {
  id?: number;
  name?: string;
  type?: string;
  image?: string;
  price?: number;
  new?: number;
  quantity_inventory?: number;
  status?: number;
  Image?: IImage;
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

  static searchProductName(params: any): Promise<Array<IProducts>> {
    const url = "api/v1/products/search-name";
    return axiosClient.get(url, { params });
  }

  static getProductById(id: number): Promise<IProducts> {
    const url = `api/v1/products/${id}`;
    return axiosClient.get(url);
  }

  static updateProduct(id: number, params: number) {
    const url = `api/v1/products/update/${id}`;
    return axiosClient.patch(url, params);
  }
}
