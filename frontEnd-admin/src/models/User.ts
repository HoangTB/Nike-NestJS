import axiosClient from "../api/AxiosClient";

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  role: number;
  status: number;
}

export class UserAPIServer {
  static getAllUser(): Promise<Array<IUser>> {
    const url = "api/v1/users";
    return axiosClient.get(url);
  }
  static getAllUserById(id: number): Promise<IUser> {
    const url = `api/v1/users/${id}`;
    return axiosClient.get(url);
  }
  static updateStatus(id: number) {
    const url = `api/v1/users/update-status/${id}`;
    return axiosClient.patch(url);
  }
  static updateActive(id: number) {
    const url = `api/v1/users/update-role/${id}`;
    return axiosClient.patch(url);
  }
}
