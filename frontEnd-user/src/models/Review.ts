import axiosClient from "../api/AxiosClient";
export interface IReview {
  id?: number;
  content?: string;
  star?: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  product_id?: number;
  user_id?: number;
  User?: {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: number;
    birthday: Date;
    role: number;
    status: number;
  };
}
export class ReviewAPI {
  static getReviewIdProMegUser(id: number): Promise<Array<IReview>> {
    const url = `/api/v1/review/proID-user/${id}`;
    return axiosClient.get(url);
  }
  static createReview(params: IReview): Promise<Array<IReview>> {
    const url = `/api/v1/review`;
    return axiosClient.post(url, params);
  }
}
