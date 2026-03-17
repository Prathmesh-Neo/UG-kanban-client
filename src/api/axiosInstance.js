import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ug-server.vercel.app/api",
  // baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    const token = localStorage.getItem("token");

    if (error.response?.status === 401 && token) {

      // clear auth
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;