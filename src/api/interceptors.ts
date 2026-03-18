import axiosInstance from "./axios";

//modify https request and responses by adding additional(dynamic) headers
//this is for request.

axiosInstance.interceptors.request.use((config) => {
    const deviceId = "2abe6bee-768f-4714-ab8d-2da64540bda8"
    const timeStamp = Date.now().toString();
    const token = localStorage.getItem("access_token");

    config.headers['timestamp'] = timeStamp;
    config.headers['xRequestId'] = `${deviceId}-${timeStamp}`;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
});
