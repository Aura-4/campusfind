import type { ItemStatus, ClaimStatus } from '@/types'
import { ITEM_STATUS_META, CLAIM_STATUS_META } from '@/utils/constants'

interface StatusBadgeProps {
  status: ItemStatus | ClaimStatus
  type?: 'item' | 'claim'
}

export function StatusBadge({ status, type = 'item' }: StatusBadgeProps) {
  const meta =
    type === 'claim'
      ? CLAIM_STATUS_META[status as ClaimStatus]
      : ITEM_STATUS_META[status as ItemStatus]

  if (!meta) return null

  return (
    <span className={`badge ${meta.bgClass} ${meta.colorClass}`}>
      {meta.label}
    </span>
  )
}
