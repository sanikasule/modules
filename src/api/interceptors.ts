import axiosInstance from "./axios";

//modify https request and responses by adding additional(dynamic) headers
//this is for request.

axiosInstance.interceptors.request.use((config) => {
    const deviceId = "2abe6bee-768f-4714-ab8d-2da64540bda8"
    const timeStamp = Date.now().toString();

    config.headers['timestamp'] = timeStamp;
    config.headers['xRequestId'] = `${deviceId}-${timeStamp}`;

    return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);