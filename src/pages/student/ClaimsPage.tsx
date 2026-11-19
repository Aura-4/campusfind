import { AppLayout } from '@/components/shared/AppLayout'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { timeAgo } from '@/utils/formatters'
import type { ClaimStatus } from '@/types'

const MOCK_CLAIMS = [
  {
    id: 'c1', itemTitle: 'Student ID Card', itemType: 'found' as const,
    status: 'Pending' as ClaimStatus,
    submittedAt: new Date(Date.now() - 3600000).toISOString(),
  },
]

export function ClaimsPage() {
  return (
    <AppLayout>
      <div className="bg-navy-900 px-4 sm:px-6 lg:px-8 pt-5 pb-8 lg:pt-8 lg:pb-10">
        <h2 className="text-white font-bold text-lg lg:text-2xl">My Claims</h2>
        <p className="text-white/60 text-sm mt-0.5">Track your ownership requests</p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        {MOCK_CLAIMS.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="font-medium text-gray-500 text-lg">No claims yet</p>
            <p className="text-sm mt-2">When you claim an item, it will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {MOCK_CLAIMS.map(claim => (
              <div key={claim.id} className="bg-white rounded-2xl shadow-card p-4 lg:p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      claim.itemType === 'lost' ? 'text-crimson-700' : 'text-navy-700'
                    }`}>{claim.itemType}</span>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base mt-0.5">{claim.itemTitle}</h3>
                    <p className="text-xs text-gray-400 mt-1">Submitted {timeAgo(claim.submittedAt)}</p>
                  </div>
                  <StatusBadge status={claim.status} type="claim" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
