// ─────────────────────────────────────────────────────────────
// Auth Store — authentication state + role management
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { setAccessToken } from '@/api/axiosClient'
import { authApi } from '@/api/authApi'
import type { User, LoginRequest, RegisterRequest } from '@/types'
import { getMockUser } from '@/dev/mockAuth'

const USE_MOCK = true // Set to false when backend is ready

interface AuthState {
  // ─── State ──────────────────────────────────────────────
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // ─── Computed helpers ────────────────────────────────────
  isStudent: () => boolean
  isHod: () => boolean
  isAdmin: () => boolean

  // ─── Actions ─────────────────────────────────────────────
  login: (payload: LoginRequest) => Promise<void>
  register: (payload: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // ─── Initial state ──────────────────────────────────
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // ─── Computed helpers ────────────────────────────────
        isStudent: () => get().user?.role === 'student',
        isHod: () => get().user?.role === 'hod',
        isAdmin: () => get().user?.role === 'admin',

        // ─── Actions ─────────────────────────────────────────

        login: async (payload) => {
          set({ isLoading: true, error: null })
          try {
            if (USE_MOCK) {
              // ── MOCK: simulate network delay ──────────────────
              await new Promise(r => setTimeout(r, 600))
              const user = getMockUser(payload.usn)
              set({ user, isAuthenticated: true, isLoading: false })
              return
            }
            const { data } = await authApi.login(payload)
            setAccessToken(data.tokens.accessToken)
            set({ user: data.user, isAuthenticated: true, isLoading: false })
          } catch (err: unknown) {
            const message = extractErrorMessage(err, 'Login failed')
            set({ isLoading: false, error: message })
            throw err
          }
        },

        register: async (payload) => {
          set({ isLoading: true, error: null })
          try {
            if (USE_MOCK) {
              await new Promise(r => setTimeout(r, 600))
              const user = getMockUser(payload.usn)
              set({ user, isAuthenticated: true, isLoading: false })
              return
            }
            const { data } = await authApi.register(payload)
            setAccessToken(data.tokens.accessToken)
            set({ user: data.user, isAuthenticated: true, isLoading: false })
          } catch (err: unknown) {
            const message = extractErrorMessage(err, 'Registration failed')
            set({ isLoading: false, error: message })
            throw err
          }
        },

        logout: async () => {
          set({ isLoading: true })
          try {
            if (!USE_MOCK) await authApi.logout()
          } finally {
            setAccessToken(null)
            set({ user: null, isAuthenticated: false, isLoading: false, error: null })
          }
        },

        fetchMe: async () => {
          set({ isLoading: true, error: null })
          try {
            const { data } = await authApi.getMe()
            set({ user: data, isAuthenticated: true, isLoading: false })
          } catch (err: unknown) {
            const message = extractErrorMessage(err, 'Could not load profile')
            set({ isLoading: false, error: message, isAuthenticated: false })
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'hkbk-laf-auth',
        // Only persist non-sensitive user metadata — token lives in memory
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
)

// ─── Helper ───────────────────────────────────────────────────

function extractErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const axiosErr = err as {
      response?: { data?: { error?: { message?: string } } }
    }
    return axiosErr.response?.data?.error?.message ?? fallback
  }
  return fallback
}
