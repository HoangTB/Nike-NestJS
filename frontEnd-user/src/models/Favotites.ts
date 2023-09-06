import axiosClient from "../api/AxiosClient";
export interface IFavorite {
  id?: number;
  user_id?: number;
  product_id?: number;
  Product?: {
    id: number;
    name: string;
    type: string;
    image: string;
    price: number;
    new: number;
    quantity_inventory: number;
  };
}
export class FavoriteAPI {
  static getFavoriteID(id: number): Promise<Array<IFavorite>> {
    const url = `/api/v1/favorite/${id}`;
    return axiosClient.get(url);
  }
  static createFavorite(params: IFavorite): Promise<Array<IFavorite>> {
    const url = `/api/v1/favorite`;
    return axiosClient.post(url, params);
  }
  static deleteFavoriteID(id: number) {
    const url = `/api/v1/favorite/${id}`;
    return axiosClient.delete(url);
  }
}
