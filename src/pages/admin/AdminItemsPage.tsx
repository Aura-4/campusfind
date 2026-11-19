import { useState } from 'react'
import { TopBar } from '@/components/shared/TopBar'
import { BottomNav } from '@/components/shared/BottomNav'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { MOCK_ITEMS } from '@/dev/mockItems'
import { timeAgo } from '@/utils/formatters'
import type { Item, ItemStatus } from '@/types'

export function AdminItemsPage() {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS)
  const [selected, setSelected] = useState<Item | null>(null)

  const updateStatus = (id: string, status: ItemStatus) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    setSelected(null)
  }

  return (
    <div className="app-shell min-h-screen bg-surface flex flex-col">
      <TopBar />

      <main className="flex-1 overflow-y-auto pb-28">
        <div className="bg-navy-900 px-4 pt-4 pb-6">
          <h2 className="text-white font-bold text-lg">All Items</h2>
          <p className="text-white/60 text-sm mt-0.5">{items.length} reports</p>
        </div>

        <div className="px-4 mt-4 flex flex-col gap-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-card p-4" onClick={() => setSelected(item)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.type === 'lost' ? 'text-crimson-700' : 'text-navy-700'}`}>{item.type}</span>
                    <StatusBadge status={item.status} type="item" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.location} · {timeAgo(item.createdAt)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">By: {item.reportedBy.name}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-300 mt-1">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Status update sheet */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-t-3xl w-full max-w-[430px] p-6 pb-10">
            <h3 className="font-bold text-navy-900 text-base mb-1">{selected.title}</h3>
            <p className="text-xs text-gray-400 mb-4">Update item status</p>
            <div className="flex flex-col gap-2">
              {(['Available', 'Claim Requested', 'Under Verification', 'Approved', 'Returned'] as ItemStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected.id, s)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    selected.status === s ? 'bg-navy-900 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
