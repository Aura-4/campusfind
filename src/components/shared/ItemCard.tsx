import { useNavigate } from 'react-router-dom'
import type { Item } from '@/types'
import { StatusBadge } from './StatusBadge'
import { timeAgo } from '@/utils/formatters'
import { useAuthStore } from '@/store'

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const base = user?.role === 'admin' ? '/admin' : '/student'

  return (
    <div
      className="bg-white rounded-2xl shadow-card p-4 cursor-pointer active:opacity-80 transition-opacity"
      onClick={() => navigate(`${base}/items/${item.id}`)}
    >
      <div className="flex items-start gap-3">
        {/* Category icon placeholder */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          item.type === 'lost' ? 'bg-crimson-900/10' : 'bg-navy-900/10'
        }`}>
          <span className="text-xl">
            {item.category === 'Electronics' ? '📱' :
             item.category === 'Books & Stationery' ? '📚' :
             item.category === 'ID & Documents' ? '🪪' :
             item.category === 'Keys' ? '🔑' :
             item.category === 'Bags & Luggage' ? '🎒' :
             item.category === 'Clothing & Accessories' ? '👕' :
             item.category === 'Jewellery & Valuables' ? '💍' : '📦'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${
              item.type === 'lost' ? 'text-crimson-700' : 'text-navy-700'
            }`}>
              {item.type}
            </span>
            <StatusBadge status={item.status} type="item" />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-gray-400">📍 {item.location}</span>
            <span className="text-[10px] text-gray-300">•</span>
            <span className="text-[10px] text-gray-400">{timeAgo(item.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
