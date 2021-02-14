import axios, { AxiosRequestConfig } from "axios";

const fetchClient = () => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_SERVER_URL,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const userID = localStorage.getItem("userID");
    config.headers.Authorization = `Bearer ${userID}`;
    return config;
  });
  return instance;
};

export default fetchClient();
