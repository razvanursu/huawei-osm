import axios, { AxiosInstance, AxiosStatic } from "axios";
import axiosRetry from 'axios-retry';
import Config from "../../config";

export const instance = axios.create({
    baseURL: Config.getConfig().getBackendAddress(),
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
      const token = await Config.getConfig().getAuthToken();
      if (token) {
        config.headers = config.headers || {}
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  
instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.log(err.config.url)
      const originalConfig = err.config;
  
      /*if (originalConfig.url !== "/api/token/" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const rs = await instance.post<{access: string}>("/api/token/refresh/", {
              refresh: await Config.getConfig().getRefreshToken(),
            });

            const { access: accessToken } = rs.data;
            await Config.getConfig().setAuthToken(accessToken);
  
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }*/
  
      return Promise.reject(err);
    }
);

export default instance;