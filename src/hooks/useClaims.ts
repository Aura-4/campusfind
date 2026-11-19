// ─────────────────────────────────────────────────────────────
// useClaims — convenience hook for claim store
// ─────────────────────────────────────────────────────────────

import { useClaimStore } from '@/store'
import { useAuth } from './useAuth'
import type { Claim } from '@/types'

export function useClaims() {
  const store = useClaimStore()
  const { user } = useAuth()

  /**
   * Returns true if the current user has an active (non-withdrawn) claim
   * for a given itemId. Used to prevent duplicate submissions.
   */
  const hasActiveClaim = (itemId: string): boolean => {
    if (!user) return false
    return store.myClaims.some(
      (c: Claim) =>
        c.itemId === itemId &&
        c.claimantId === user.id &&
        c.status !== 'Withdrawn' &&
        c.status !== 'Rejected'
    )
  }

  return {
    ...store,
    hasActiveClaim,
  }
}
