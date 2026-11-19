// ─────────────────────────────────────────────────────────────
// MOCK AUTH — frontend-only, no real backend
// Replace with real authApi calls when backend is ready.
// ─────────────────────────────────────────────────────────────

import type { User } from '@/types'

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Nida Fatima',
  email: 'nida.fatima@hkbk.edu.in',
  usn: 'HKBK-CSE-24018',
  role: 'student',
  department: 'Computer Science',
  yearGroup: '3rd Year',
  phone: '9876543210',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Dr. Anitha K',
  email: 'anitha@hkbk.edu.in',
  usn: 'ADMIN',
  role: 'admin',
  department: 'Computer Science',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export function getMockUser(usn: string): User {
  if (usn.toUpperCase() === 'ADMIN') return MOCK_ADMIN
  return { ...MOCK_USER, usn: usn.toUpperCase() }
}
