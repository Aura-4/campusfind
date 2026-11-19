// ─────────────────────────────────────────────────────────────
// Claims API
//
// BACKEND CONTRACT REQUIRED:
//   POST   /api/claims                  → Claim
//   GET    /api/claims                  → PaginatedClaimsResponse (admin/hod)
//   GET    /api/claims/my               → PaginatedClaimsResponse (student)
//   GET    /api/claims/:id              → Claim
//   PATCH  /api/claims/:id/review       → Claim (admin/hod: approve or reject)
//   DELETE /api/claims/:id              → void  (student: withdraw own claim)
//
// BUSINESS RULES (enforced on frontend AND backend):
//   - A student cannot claim an item they originally reported.
//   - Only items with status "Available" can be claimed.
//   - Duplicate claims from the same student are rejected.
// ─────────────────────────────────────────────────────────────

import apiClient from './axiosClient'
import type {
  Claim,
  SubmitClaimRequest,
  ReviewClaimRequest,
  ClaimListFilters,
  PaginatedClaimsResponse,
} from '@/types'

function toParams(filters: ClaimListFilters): URLSearchParams {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, String(value))
    }
  })
  return params
}

export const claimsApi = {
  /**
   * Submit a new ownership claim.
   * Accepts optional proof images as multipart/form-data.
   */
  submitClaim: (payload: SubmitClaimRequest) => {
    const form = new FormData()
    form.append('itemId', payload.itemId)
    form.append('description', payload.description)
    payload.proofImages?.forEach((file) =>
      form.append('proofImages[]', file)
    )
    return apiClient.post<Claim>('/claims', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Admin / HOD: fetch all claims with optional filters.
   */
  getAllClaims: (filters: ClaimListFilters = {}) =>
    apiClient.get<PaginatedClaimsResponse>('/claims', {
      params: toParams(filters),
    }),

  /**
   * Student: fetch their own claim history.
   */
  getMyClaims: (filters: ClaimListFilters = {}) =>
    apiClient.get<PaginatedClaimsResponse>('/claims/my', {
      params: toParams(filters),
    }),

  /**
   * Fetch a single claim by ID.
   */
  getClaimById: (id: string) => apiClient.get<Claim>(`/claims/${id}`),

  /**
   * Admin / HOD: approve or reject a claim.
   */
  reviewClaim: (id: string, payload: ReviewClaimRequest) =>
    apiClient.patch<Claim>(`/claims/${id}/review`, payload),

  /**
   * Student: withdraw a pending claim.
   */
  withdrawClaim: (id: string) =>
    apiClient.delete<void>(`/claims/${id}`),
}
