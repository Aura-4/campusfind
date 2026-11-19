import { useState } from 'react'
import { TopBar } from '@/components/shared/TopBar'
import { BottomNav } from '@/components/shared/BottomNav'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { timeAgo } from '@/utils/formatters'
import type { Claim, ClaimStatus } from '@/types'

const MOCK_CLAIMS: Claim[] = [
  {
    id: 'c1', itemId: 'item-2', itemTitle: 'Student ID Card',
    claimantId: 'u1', claimantName: 'Nida Fatima', claimantUsn: 'HKBK-CSE-24018',
    status: 'Pending', description: 'This is my ID card. It has my photo and USN on it.',
    submittedAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
]

export function AdminClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [selected, setSelected] = useState<Claim | null>(null)

  const review = (id: string, status: 'Approved' | 'Rejected') => {
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status: status as ClaimStatus } : c))
    setSelected(null)
  }

  return (
    <div className="app-shell min-h-screen bg-surface flex flex-col">
      <TopBar />

      <main className="flex-1 overflow-y-auto pb-28">
        <div className="bg-navy-900 px-4 pt-4 pb-6">
          <h2 className="text-white font-bold text-lg">Claims Review</h2>
          <p className="text-white/60 text-sm mt-0.5">{claims.length} claim request{claims.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="px-4 mt-4 flex flex-col gap-3">
          {claims.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">✅</p>
              <p className="font-medium">No pending claims</p>
            </div>
          ) : claims.map(claim => (
            <div key={claim.id} className="bg-white rounded-2xl shadow-card p-4 cursor-pointer active:opacity-80" onClick={() => setSelected(claim)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={claim.status} type="claim" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{claim.itemTitle}</p>
                  <p className="text-xs text-gray-500 mt-0.5">By: {claim.claimantName} · {claim.claimantUsn}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{claim.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(claim.submittedAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-t-3xl w-full max-w-[430px] p-6 pb-10">
            <h3 className="font-bold text-navy-900 text-base mb-1">Review Claim</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>{selected.itemTitle}</strong></p>
            <p className="text-xs text-gray-500 mb-1">Claimant: {selected.claimantName} ({selected.claimantUsn})</p>
            <p className="text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-3">{selected.description}</p>
            <div className="flex gap-3">
              <button onClick={() => review(selected.id, 'Rejected')} className="flex-1 py-3 rounded-full border-2 border-red-400 text-red-500 font-semibold text-sm active:opacity-70">
                Reject
              </button>
              <button onClick={() => review(selected.id, 'Approved')} className="flex-1 py-3 rounded-full bg-teal-600 text-white font-semibold text-sm active:opacity-70">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
