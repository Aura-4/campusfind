// ─────────────────────────────────────────────────────────────
// Authentication & User Types
// ─────────────────────────────────────────────────────────────

export type UserRole = 'student' | 'hod' | 'admin'

export type YearGroup = '1st Year' | '2nd Year' | '3rd Year' | '4th Year'

export type Department =
  | 'Computer Science'
  | 'Information Science'
  | 'Electronics & Communication'
  | 'Mechanical'
  | 'Civil'
  | 'Electrical'
  | 'Other'

export interface User {
  id: string
  name: string
  email: string
  usn: string           // University Seat Number (student identifier)
  role: UserRole
  department: Department
  yearGroup?: YearGroup  // only for students
  phone?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number     // seconds
}

export interface LoginRequest {
  usn: string           // students log in with USN
  password: string
}

export interface RegisterRequest {
  name: string
  usn: string
  email: string
  password: string
  department: Department
  yearGroup: YearGroup
  phone?: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  expiresIn: number
}
