// ─────────────────────────────────────────────────────────────
// DEV FIXTURES — temporary development data
//
// ⚠️  NEVER import this file from production code.
// ⚠️  Used ONLY for local development while backend is unavailable.
// ⚠️  This entire directory will be deleted before production build.
//
// When the backend becomes available, delete this file and
// connect real API calls via the api/ modules.
// ─────────────────────────────────────────────────────────────

import type { User, Item, Claim, KeyRecord } from '@/types'

export const DEV_USERS: User[] = [
  {
    id: 'dev-user-1',
    name: 'Mohammed Raza',
    email: 'raza@hkbk.edu.in',
    usn: '1HK21CS001',
    role: 'student',
    department: 'Computer Science',
    yearGroup: '3rd Year',
    phone: '9876543210',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dev-user-2',
    name: 'Dr. Anitha K',
    email: 'anitha@hkbk.edu.in',
    usn: 'HOD-CS',
    role: 'hod',
    department: 'Computer Science',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const DEV_ITEMS: Item[] = [
  {
    id: 'dev-item-1',
    type: 'lost',
    title: 'Black Laptop Bag',
    description: 'HP laptop bag with a blue zipper, left near the library entrance.',
    category: 'Bags & Luggage',
    status: 'Available',
    location: 'Library',
    date: new Date().toISOString(),
    images: [],
    reportedBy: {
      id: 'dev-user-1',
      name: 'Mohammed Raza',
      usn: '1HK21CS001',
      yearGroup: '3rd Year',
      department: 'Computer Science',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dev-item-2',
    type: 'found',
    title: 'Student ID Card',
    description: 'ID card found near the canteen. USN partially visible.',
    category: 'ID & Documents',
    status: 'Available',
    location: 'Canteen',
    date: new Date().toISOString(),
    images: [],
    reportedBy: {
      id: 'dev-user-2',
      name: 'Dr. Anitha K',
      usn: 'HOD-CS',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const DEV_CLAIMS: Claim[] = []

export const DEV_KEYS: KeyRecord[] = [
  {
    id: 'dev-key-1',
    keyIdentifier: 'LAB-301-A',
    label: 'Computer Lab 3rd Floor',
    category: 'Lab',
    status: 'Active',
    issuedTo: {
      id: 'dev-user-1',
      name: 'Mohammed Raza',
      usn: '1HK21CS001',
      role: 'student',
    },
    issuedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
