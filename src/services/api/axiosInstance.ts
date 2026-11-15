import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import ENV from '../../config/environment';
import { tokenManager } from './tokenManager';
import { API_ENDPOINTS } from './apiEndpoints';
import logger from '../../utils/logger';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach Bearer Token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await tokenManager.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      logger.warn('AxiosInstance', 'Failed to retrieve access token for request');
    }

    logger.info('HTTP_REQ', `${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor: 401 Token Refresh & Auto-Retry
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.info('HTTP_RES', `${response.status} ${response.config.url}`);
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await tokenManager.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await axios.post(
          `${ENV.API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          { timeout: ENV.API_TIMEOUT_MS }
        );

        const newAccessToken = refreshResponse.data?.data?.accessToken;
        const newRefreshToken = refreshResponse.data?.data?.refreshToken || refreshToken;

        if (newAccessToken) {
          await tokenManager.saveTokens(newAccessToken, newRefreshToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Failed to obtain new access token');
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        await tokenManager.clearTokens();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
