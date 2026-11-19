// ─────────────────────────────────────────────────────────────
// Physical Key Management API
//
// BACKEND CONTRACT REQUIRED:
//   GET    /api/keys                    → PaginatedKeysResponse
//   POST   /api/keys                    → KeyRecord
//   GET    /api/keys/:id                → KeyRecord
//   PATCH  /api/keys/:id/revoke         → KeyRecord
//   DELETE /api/keys/:id                → void (admin only)
//
// ACCESS:
//   - Students: view keys issued to them (read-only)
//   - HOD: add and revoke keys for their department
//   - Admin: full CRUD
// ─────────────────────────────────────────────────────────────

import apiClient from './axiosClient'
import type {
  KeyRecord,
  AddKeyRequest,
  RevokeKeyRequest,
  KeyListFilters,
  PaginatedKeysResponse,
} from '@/types'

function toParams(filters: KeyListFilters): URLSearchParams {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, String(value))
    }
  })
  return params
}

export const keysApi = {
  /**
   * Fetch paginated key records.
   */
  getKeys: (filters: KeyListFilters = {}) =>
    apiClient.get<PaginatedKeysResponse>('/keys', {
      params: toParams(filters),
    }),

  /**
   * Fetch a single key record by ID.
   */
  getKeyById: (id: string) => apiClient.get<KeyRecord>(`/keys/${id}`),

  /**
   * Add a new key record (HOD / admin).
   */
  addKey: (payload: AddKeyRequest) =>
    apiClient.post<KeyRecord>('/keys', payload),

  /**
   * Revoke an active key (HOD / admin).
   */
  revokeKey: (payload: RevokeKeyRequest) =>
    apiClient.patch<KeyRecord>(`/keys/${payload.keyId}/revoke`, {
      note: payload.note,
    }),

  /**
   * Delete a key record (admin only).
   */
  deleteKey: (id: string) => apiClient.delete<void>(`/keys/${id}`),
}
