// ─────────────────────────────────────────────────────────────
// useAuth — convenience hook for auth state + actions
// ─────────────────────────────────────────────────────────────

import { useAuthStore } from '@/store'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const error = useAuthStore((s) => s.error)
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const logout = useAuthStore((s) => s.logout)
  const fetchMe = useAuthStore((s) => s.fetchMe)
  const clearError = useAuthStore((s) => s.clearError)

  const isStudent = user?.role === 'student'
  const isHod = user?.role === 'hod'
  const isAdmin = user?.role === 'admin'
  const isPrivileged = isHod || isAdmin

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isStudent,
    isHod,
    isAdmin,
    isPrivileged,
    login,
    register,
    logout,
    fetchMe,
    clearError,
  }
}
