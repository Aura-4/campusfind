// ─────────────────────────────────────────────────────────────
// Claim Request Types
// ─────────────────────────────────────────────────────────────

export type ClaimStatus =
  | 'Pending'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Withdrawn'

export interface ClaimProof {
  id: string
  url: string
  description?: string
}

export interface Claim {
  id: string
  itemId: string
  itemTitle: string
  itemImageUrl?: string
  claimantId: string
  claimantName: string
  claimantUsn: string
  status: ClaimStatus
  description: string        // claimant's ownership justification
  proofImages?: ClaimProof[]
  adminNote?: string         // note from HOD/admin on decision
  reviewedBy?: {
    id: string
    name: string
    role: string
  }
  submittedAt: string
  reviewedAt?: string
  updatedAt: string
}

// ─── Request / Response shapes ────────────────────────────────

export interface SubmitClaimRequest {
  itemId: string
  description: string
  proofImages?: File[]       // uploaded via FormData
}

export interface ReviewClaimRequest {
  status: 'Approved' | 'Rejected'
  adminNote?: string
}

export interface ClaimListFilters {
  status?: ClaimStatus
  itemId?: string
  claimantId?: string
  page?: number
  limit?: number
}

export interface PaginatedClaimsResponse {
  claims: Claim[]
  total: number
  page: number
  limit: number
  totalPages: number
}
