// ─────────────────────────────────────────────────────────────
// Physical Key Tracking Types
// ─────────────────────────────────────────────────────────────

export type KeyStatus = 'Active' | 'Revoked' | 'Lost' | 'Returned'

export type KeyCategory =
  | 'Classroom'
  | 'Lab'
  | 'Staff Room'
  | 'Office'
  | 'Store Room'
  | 'Other'

export interface KeyRecord {
  id: string
  keyIdentifier: string     // e.g. "LAB-301-A", physical label on key
  label: string             // human-readable name, e.g. "Chemistry Lab 3rd Floor"
  category: KeyCategory
  status: KeyStatus
  issuedTo?: {
    id: string
    name: string
    usn: string
    role: string
  }
  issuedAt?: string
  revokedAt?: string
  revokedBy?: {
    id: string
    name: string
    role: string
  }
  notes?: string
  createdAt: string
  updatedAt: string
}

// ─── Request / Response shapes ────────────────────────────────

export interface AddKeyRequest {
  keyIdentifier: string
  label: string
  category: KeyCategory
  issuedToUsn?: string      // USN of person receiving the key
  notes?: string
}

export interface RevokeKeyRequest {
  keyId: string
  note?: string
}

export interface KeyListFilters {
  status?: KeyStatus
  category?: KeyCategory
  issuedToId?: string
  page?: number
  limit?: number
}

export interface PaginatedKeysResponse {
  keys: KeyRecord[]
  total: number
  page: number
  limit: number
  totalPages: number
}
