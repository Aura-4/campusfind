// ─────────────────────────────────────────────────────────────
// Axios base client with auth interceptors
// ─────────────────────────────────────────────────────────────

import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'

// Base URL is read from environment — set VITE_API_URL in .env
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Token helpers ────────────────────────────────────────────
// Token is stored in memory (accessed via authStore) to avoid
// XSS risk from localStorage. Refresh token lives in an
// httpOnly cookie set by the backend.

let _accessToken: string | null = null

export function setAccessToken(token: string | null): void {
  _accessToken = token
}

export function getAccessToken(): string | null {
  return _accessToken
}

// ─── Request interceptor: attach Bearer token ─────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (_accessToken) {
      config.headers.Authorization = `Bearer ${_accessToken}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// ─── Response interceptor: handle 401 and token refresh ───────

let isRefreshing = false
let pendingQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

function processPendingQueue(error: unknown, token: string | null): void {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token!)
    }
  })
  pendingQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until the token refresh completes
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = `Bearer ${token}`
              }
              resolve(apiClient(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Refresh endpoint uses the httpOnly refresh cookie automatically
        const { data } = await apiClient.post<{
          accessToken: string
          expiresIn: number
        }>('/auth/refresh')

        setAccessToken(data.accessToken)
        processPendingQueue(null, data.accessToken)

        if (originalRequest.headers) {
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${data.accessToken}`
        }
        return apiClient(originalRequest)
      } catch (refreshError) {
        processPendingQueue(refreshError, null)
        setAccessToken(null)
        // Redirect to login — import avoided to prevent circular deps
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
