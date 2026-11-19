import { useState } from 'react'
import { AppLayout } from '@/components/shared/AppLayout'
import { ItemCard } from '@/components/shared/ItemCard'
import { MOCK_ITEMS } from '@/dev/mockItems'
import { ITEM_CATEGORIES } from '@/utils/constants'
import type { ItemType } from '@/types'

export function ItemsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<ItemType | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = MOCK_ITEMS.filter(item => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    const matchType = typeFilter === 'all' || item.type === typeFilter
    const matchCat = !categoryFilter || item.category === categoryFilter
    return matchSearch && matchType && matchCat
  })

  return (
    <AppLayout>
      {/* Header band */}
      <div className="bg-navy-900 px-4 sm:px-6 lg:px-8 pt-5 pb-8 lg:pt-8 lg:pb-10">
        <h2 className="text-white font-bold text-lg lg:text-2xl mb-4">Browse Items</h2>
        {/* Search bar */}
        <div className="relative max-w-xl">
          <input
            className="w-full rounded-xl bg-white/15 backdrop-blur border border-white/20
                       px-4 py-2.5 pl-10 text-sm text-white placeholder-white/50
                       focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Search by title or description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60"
            width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Filters row */}
        <div className="py-4 flex flex-wrap gap-2 items-center">
          {(['all', 'lost', 'found'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                typeFilter === t
                  ? 'bg-navy-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {t === 'all' ? 'All Items' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}

          <div className="relative">
            <select
              className="pl-3 pr-7 py-1.5 rounded-full text-xs font-semibold
                         bg-white text-gray-600 border border-gray-200 focus:outline-none appearance-none
                         hover:border-gray-300 transition-colors"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {ITEM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          <span className="ml-auto text-xs text-gray-400 hidden sm:block">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-3 sm:hidden">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-medium text-gray-500 text-lg">No items match your search</p>
            <p className="text-sm mt-2">Try a different keyword or filter</p>
          </div>
        ) : (
          /* 1 col mobile → 2 col sm → 3 col lg → 4 col xl */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 pb-6">
            {filtered.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
