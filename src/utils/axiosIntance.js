import axios from "axios";

// ✅ Base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

const excludedPaths = ["/auth/login", "/auth/register", "/auth/refresh"];


instance.interceptors.request.use((config) => {
    if (!excludedPaths.some((path) => config.url?.includes(path))) {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});


export const globalNetworkStatus = {
    setConnectionError: null,
};

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token) {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}


instance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;


        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !excludedPaths.some((path) => originalRequest.url.includes(path))
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(instance(originalRequest));
                        },
                        reject,
                    });
                });
            }

            isRefreshing = true;
            const refreshToken = localStorage.getItem("refresh_token");

            try {
                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refresh_token: refreshToken,
                });

                const newToken = response.data.access_token;
                localStorage.setItem("access_token", newToken);
                instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }


        if (!error.response) {
            if (error.message?.includes("timeout")) {
                globalNetworkStatus.setConnectionError?.({
                    type: "timeout",
                    message: "Yêu cầu quá thời gian phản hồi.",
                });
            } else if (error.message?.includes("Network")) {
                globalNetworkStatus.setConnectionError?.({
                    type: "no-internet",
                    message: "Không có kết nối Internet.",
                });
            } else {
                globalNetworkStatus.setConnectionError?.({
                    type: "server-unreachable",
                    message: "Không thể kết nối đến máy chủ.",
                });
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
