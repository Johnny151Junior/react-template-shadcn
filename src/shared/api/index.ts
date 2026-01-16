import { SERVER_PREFIX, SERVER_URL } from "@/shared/constants";
import { LOCALSTORE_REFRESH_TOKEN_KEY } from "@/shared/constants/auth-local-storage";
import type { IRefreshTokenResponse } from "@/features/auth/model/auth.types";
import { useAuthStore } from "@/features/auth/model/auth.store";
import type { IHttpResponse } from "@/shared/lib/types/http-response.type";
import axios from "axios";

const api = axios.create({
  baseURL: SERVER_URL + SERVER_PREFIX,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the access token to every request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      const { setTokens, clearAuth } = useAuthStore.getState();
      const refreshToken = localStorage.getItem(LOCALSTORE_REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        clearAuth();
        return Promise.reject(error);
      }

      try {
        const resp = await axios.post<IHttpResponse<IRefreshTokenResponse>>(
          SERVER_URL + SERVER_PREFIX + "/auth/refresh",
          { refresh_token: refreshToken }
        ); // Your refresh token endpoint
        const data = resp.data.data;
        if (!data) {
          console.error("Failed to refresh token cause data refresh is null");
          clearAuth();
          return Promise.reject(error);
        }
        setTokens(data.access_token, data.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${data.refresh_token}`;
        processQueue(null, data.access_token);
        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        clearAuth();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
