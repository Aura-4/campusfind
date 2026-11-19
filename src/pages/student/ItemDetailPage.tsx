import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppLayout } from '@/components/shared/AppLayout'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { MOCK_ITEMS } from '@/dev/mockItems'
import { useAuthStore } from '@/store'
import { formatDate, timeAgo } from '@/utils/formatters'

export function ItemDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const item = MOCK_ITEMS.find(i => i.id === id)
  const [claimSubmitted, setClaimSubmitted] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [claimDesc, setClaimDesc] = useState('')

  if (!item) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
          <p className="text-5xl">🔍</p>
          <p className="font-semibold text-gray-700 text-lg">Item not found</p>
          <button onClick={() => navigate(-1)} className="btn-primary lg:w-auto lg:px-8">Go Back</button>
        </div>
      </AppLayout>
    )
  }

  const isOwn = user?.id === item.reportedBy.id
  const canClaim = !isOwn && item.status === 'Available' && !claimSubmitted

  const handleClaim = () => {
    if (!claimDesc.trim()) return
    setClaimSubmitted(true)
    setShowClaimModal(false)
  }

  return (
    <AppLayout showBack title="Item Details">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-8">

        {/* Desktop two-column: image+actions left, details right */}
        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Left column: image + action */}
          <div className="lg:col-span-2">
            <div className={`w-full rounded-2xl flex items-center justify-center h-48 lg:h-64 ${
              item.type === 'lost' ? 'bg-crimson-900' : 'bg-navy-800'
            }`}>
              <span className="text-7xl lg:text-8xl opacity-60">
                {item.category === 'Electronics' ? '📱' :
                 item.category === 'Books & Stationery' ? '📚' :
                 item.category === 'ID & Documents' ? '🪪' :
                 item.category === 'Keys' ? '🔑' :
                 item.category === 'Bags & Luggage' ? '🎒' :
                 item.category === 'Clothing & Accessories' ? '👕' : '📦'}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4">
              {canClaim && (
                <button onClick={() => setShowClaimModal(true)} className="btn-primary">
                  Claim this Item
                </button>
              )}
              {isOwn && (
                <div className="bg-navy-900/5 rounded-xl px-4 py-3 text-sm text-gray-500 text-center">
                  You reported this item
                </div>
              )}
              {claimSubmitted && (
                <div className="bg-teal-500/10 rounded-xl px-4 py-3 text-sm text-teal-700 text-center font-semibold">
                  ✓ Claim submitted — pending review
                </div>
              )}
              {!canClaim && !isOwn && !claimSubmitted && item.status !== 'Available' && (
                <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500 text-center">
                  This item is {item.status.toLowerCase()} and cannot be claimed
                </div>
              )}
            </div>
          </div>

          {/* Right column: details */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                item.type === 'lost' ? 'text-crimson-700' : 'text-navy-700'
              }`}>{item.type}</span>
              <StatusBadge status={item.status} type="item" />
            </div>

            <h1 className="text-navy-900 text-xl lg:text-2xl font-bold mb-2">{item.title}</h1>
            <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6">{item.description}</p>

            <div className="bg-white rounded-2xl shadow-card divide-y divide-gray-100">
              {[
                { label: 'Category', value: item.category },
                { label: 'Location', value: item.location },
                { label: 'Date', value: formatDate(item.date) },
                { label: 'Reported by', value: `${item.reportedBy.name} · ${item.reportedBy.yearGroup ?? ''}` },
                { label: 'Posted', value: timeAgo(item.createdAt) },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3.5">
                  <span className="text-xs lg:text-sm text-gray-400 font-medium">{label}</span>
                  <span className="text-xs lg:text-sm text-gray-800 font-semibold text-right max-w-[55%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Claim modal — same on all sizes */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowClaimModal(false)} />
          <div className="relative bg-white rounded-t-3xl lg:rounded-2xl w-full lg:max-w-lg p-6 pb-10 lg:pb-6 mx-0 lg:mx-4">
            <h3 className="text-navy-900 font-bold text-lg mb-1">Claim this Item</h3>
            <p className="text-gray-500 text-sm mb-4">Explain why this item belongs to you.</p>
            <textarea
              className="form-textarea min-h-[100px] mb-4"
              placeholder="Describe how you can prove ownership…"
              value={claimDesc}
              onChange={e => setClaimDesc(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={() => setShowClaimModal(false)} className="flex-1 btn-outline py-3">Cancel</button>
              <button onClick={handleClaim} disabled={!claimDesc.trim()} className="flex-1 btn-primary py-3 disabled:opacity-50">
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
