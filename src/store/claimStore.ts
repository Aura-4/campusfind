// ─────────────────────────────────────────────────────────────
// Claim Store — claim request state
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { claimsApi } from '@/api/claimsApi'
import type {
  Claim,
  ClaimListFilters,
  SubmitClaimRequest,
  ReviewClaimRequest,
} from '@/types'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'

interface ClaimState {
  // ─── State ──────────────────────────────────────────────
  claims: Claim[]               // admin/hod view
  myClaims: Claim[]             // student's own claims
  selectedClaim: Claim | null
  pagination: { total: number; page: number; totalPages: number }
  isLoading: boolean
  isSubmitting: boolean
  error: string | null

  // ─── Actions ─────────────────────────────────────────────
  fetchAllClaims: (filters?: ClaimListFilters) => Promise<void>
  fetchMyClaims: (filters?: ClaimListFilters) => Promise<void>
  fetchClaimById: (id: string) => Promise<void>
  submitClaim: (payload: SubmitClaimRequest) => Promise<Claim>
  reviewClaim: (id: string, payload: ReviewClaimRequest) => Promise<void>
  withdrawClaim: (id: string) => Promise<void>
  clearSelectedClaim: () => void
  clearError: () => void
}

export const useClaimStore = create<ClaimState>()(
  devtools(
    (set) => ({
      claims: [],
      myClaims: [],
      selectedClaim: null,
      pagination: { total: 0, page: 1, totalPages: 1 },
      isLoading: false,
      isSubmitting: false,
      error: null,

      fetchAllClaims: async (filters = { page: 1, limit: DEFAULT_PAGE_SIZE }) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await claimsApi.getAllClaims(filters)
          set({
            claims: data.claims,
            pagination: {
              total: data.total,
              page: data.page,
              totalPages: data.totalPages,
            },
          })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load claims') })
        } finally {
          set({ isLoading: false })
        }
      },

      fetchMyClaims: async (filters = { page: 1, limit: DEFAULT_PAGE_SIZE }) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await claimsApi.getMyClaims(filters)
          set({
            myClaims: data.claims,
            pagination: {
              total: data.total,
              page: data.page,
              totalPages: data.totalPages,
            },
          })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load your claims') })
        } finally {
          set({ isLoading: false })
        }
      },

      fetchClaimById: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await claimsApi.getClaimById(id)
          set({ selectedClaim: data })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load claim') })
        } finally {
          set({ isLoading: false })
        }
      },

      submitClaim: async (payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await claimsApi.submitClaim(payload)
          set((state) => ({ myClaims: [data, ...state.myClaims] }))
          return data
        } catch (err) {
          const message = extractMessage(err, 'Failed to submit claim')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      reviewClaim: async (id, payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await claimsApi.reviewClaim(id, payload)
          set((state) => ({
            claims: state.claims.map((c) => (c.id === id ? data : c)),
            selectedClaim:
              state.selectedClaim?.id === id ? data : state.selectedClaim,
          }))
        } catch (err) {
          const message = extractMessage(err, 'Failed to review claim')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      withdrawClaim: async (id) => {
        set({ isSubmitting: true, error: null })
        try {
          await claimsApi.withdrawClaim(id)
          set((state) => ({
            myClaims: state.myClaims.filter((c) => c.id !== id),
          }))
        } catch (err) {
          const message = extractMessage(err, 'Failed to withdraw claim')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      clearSelectedClaim: () => set({ selectedClaim: null }),

      clearError: () => set({ error: null }),
    }),
    { name: 'ClaimStore' }
  )
)

function extractMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const e = err as { response?: { data?: { error?: { message?: string } } } }
    return e.response?.data?.error?.message ?? fallback
  }
  return fallback
}
