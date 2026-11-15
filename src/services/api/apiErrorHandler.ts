import axios, { AxiosError } from 'axios';
import logger from '../../utils/logger';

export interface NormalizedError {
  message: string;
  statusCode: number;
  code?: string;
  details?: Record<string, string[]>;
  isNetworkError: boolean;
  isTimeout: boolean;
  isUnauthorized: boolean;
}

export const normalizeApiError = (error: unknown): NormalizedError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    const status = axiosError.response?.status || 0;
    const data = axiosError.response?.data;

    const isTimeout = axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout');
    const isNetworkError = !axiosError.response && (axiosError.code === 'ERR_NETWORK' || !axiosError.status);
    const isUnauthorized = status === 401;

    let message = 'An unexpected error occurred. Please try again.';

    if (data?.message) {
      message = data.message;
    } else if (data?.error) {
      message = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
    } else if (isTimeout) {
      message = 'Request timed out. Please check your internet connection.';
    } else if (isNetworkError) {
      message = 'Network connection failed. Please check your internet connection.';
    } else if (status === 403) {
      message = 'Access forbidden. You do not have permission.';
    } else if (status === 404) {
      message = 'The requested resource was not found.';
    } else if (status >= 500) {
      message = 'Server encountered an issue. Our team is working on it.';
    }

    logger.warn('ApiErrorHandler', `Status ${status}: ${message}`, {
      url: axiosError.config?.url,
      method: axiosError.config?.method,
    });

    return {
      message,
      statusCode: status,
      code: axiosError.code,
      details: data?.errors,
      isNetworkError,
      isTimeout,
      isUnauthorized,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 0,
      isNetworkError: false,
      isTimeout: false,
      isUnauthorized: false,
    };
  }

  return {
    message: 'An unknown error occurred.',
    statusCode: 0,
    isNetworkError: false,
    isTimeout: false,
    isUnauthorized: false,
  };
};

export default normalizeApiError;
