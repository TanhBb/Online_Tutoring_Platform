import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5297", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // if (config.data instanceof FormData) {
    //   config.headers["Content-Type"] = "application/json";
    // }

    // const token = authService.getAccessToken();
    // if (!noAuthList.includes(config.url) && token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // /// Logout if the token has expired
    // if (error.response && error.response.status === 401) {
    //   if (authService.isLogin()) {
    //     storageService.clear();
    //     swalService.showMessageToHandle(
    //       "Session Expired",
    //       "Your session has expired. Please login again.",
    //       "error",
    //       () => authService.logout()
    //     );
    //   }
    // }

    return Promise.reject(error);
  }
);

export default axiosClient;
