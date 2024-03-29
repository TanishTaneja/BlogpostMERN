import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "http://localhost:5001"

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;