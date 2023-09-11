import axios, { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.defaults.withCredentials = true;
// Sử dụng giá trị refreshToken
axios.defaults.withCredentials = true;

const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/users/refresh-token",
      {
        withCredentials: true,
      }
    );
    console.log(res.data);

    localStorage.setItem("accessToken", res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

let isRefreshing = false; // Biến cờ để kiểm tra xem cuộc gọi refreshToken đã được thực hiện hay chưa
let refreshPromise: Promise<any> | null = null; // Biến lưu trữ promise của cuộc gọi refreshToken
axiosClient.interceptors.request.use(
  async (config) => {
    let token;
    try {
      let date = new Date(); //Tạo ngày giờ hiện tại kiểm tra
      token = localStorage.getItem("accessToken") as any;
      const decodedToken: any = await jwtDecode(token); //giải mã token
      // console.log(decodedToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        //Kiểm tra xem giờ hết hạn token vs giờ hiện tại nếu hết thì phải gọi refreshToken để nhận token mới

        if (!isRefreshing) {
          // Nếu chưa có cuộc gọi refreshToken nào được thực hiện
          isRefreshing = true; // Đánh dấu rằng đang thực hiện cuộc gọi refreshToken
          // Tạo promise cho cuộc gọi refreshToken
          refreshPromise = refreshToken()
            .then((data) => {
              token = data;
            })
            .finally(() => {
              isRefreshing = false; // Sau khi thực hiện xong, đặt lại biến cờ
              refreshPromise = null; // Đặt lại promise thành null
            });
        }

        // Chờ cho đến khi promise của refreshToken hoàn thành
        await refreshPromise;
      }
    } catch (e) {}

    if (token !== null) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    const { config, status, data } = error?.response;

    if (config.url === "register" && status === 400) {
      throw new Error(data);
    }
    if (config.url === "login" && status === 400) {
      throw new Error(data);
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
