import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const AxiosClientFormData = axios.create({
  baseURL: "https://server-0169.onrender.com/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

AxiosClientFormData.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosClientFormData.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    console.log("axiosClient - response error", error.response);
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

export default AxiosClientFormData;
