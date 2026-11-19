// ─────────────────────────────────────────────────────────────
// Authentication API
//
// BACKEND CONTRACT REQUIRED:
//   POST   /api/auth/login          → AuthResponse
//   POST   /api/auth/register       → AuthResponse
//   GET    /api/auth/me             → User
//   POST   /api/auth/refresh        → RefreshTokenResponse
//   POST   /api/auth/logout         → void (clears httpOnly cookie)
// ─────────────────────────────────────────────────────────────

import apiClient from './axiosClient'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenResponse,
  User,
} from '@/types'

export const authApi = {
  /**
   * Log in with USN and password.
   * Backend sets an httpOnly refresh-token cookie on success.
   */
  login: (payload: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', payload),

  /**
   * Register a new student account.
   */
  register: (payload: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', payload),

  /**
   * Get the currently authenticated user's profile.
   */
  getMe: () => apiClient.get<User>('/auth/me'),

  /**
   * Use the httpOnly refresh cookie to obtain a new access token.
   */
  refreshToken: () =>
    apiClient.post<RefreshTokenResponse>('/auth/refresh'),

  /**
   * Log out — backend should invalidate the refresh cookie.
   */
  logout: () => apiClient.post<void>('/auth/logout'),
}
