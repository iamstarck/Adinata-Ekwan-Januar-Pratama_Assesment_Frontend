import axios from "axios";

const SERVER_URL = "https://dev.patriotmed.id";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        const token = parsed.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth token:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
