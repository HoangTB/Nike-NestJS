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
    localStorage.setItem("accessToken", res.data);
    // console.log("accessToken", res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    let token;
    try {
      let date = new Date(); //Tạo ngày giờ hiện tại kiểm tra
      token = localStorage.getItem("accessToken") as any;
      const decodedToken: any = await jwtDecode(token); //giải mã token
      // console.log(decodedToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        //Kiểm tra xem giờ hết hạn token vs giờ hiện tại nếu hết thì phải gọi api refresh để nhận token mới
        const data = await refreshToken();
        token = data;
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
