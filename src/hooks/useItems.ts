// ─────────────────────────────────────────────────────────────
// useItems — convenience hook for item store + permissions
// ─────────────────────────────────────────────────────────────

import { useItemStore } from '@/store'
import { useAuth } from './useAuth'
import type { Item } from '@/types'

export function useItems() {
  const store = useItemStore()
  const { user } = useAuth()

  /**
   * Returns true if the current user can claim this item.
   * Rules:
   *   - Item must be "Available"
   *   - User must NOT be the reporter
   *   - User must be authenticated
   */
  const canClaim = (item: Item): boolean => {
    if (!user) return false
    if (item.status !== 'Available') return false
    if (item.reportedBy.id === user.id) return false
    return true
  }

  /**
   * Returns true if the current user reported this item.
   */
  const isReporter = (item: Item): boolean => {
    return user?.id === item.reportedBy.id
  }

  return {
    ...store,
    canClaim,
    isReporter,
  }
}
