import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/shared/AppLayout'
import { ItemCard } from '@/components/shared/ItemCard'
import { MOCK_ITEMS } from '@/dev/mockItems'
import type { Item } from '@/types'

export function FindItemPage() {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [results, setResults] = useState<Item[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleAiSearch = async () => {
    if (!description.trim()) return
    setIsSearching(true)
    await new Promise(r => setTimeout(r, 1200))
    const q = description.toLowerCase()
    const matched = MOCK_ITEMS.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q)
    )
    setResults(matched.length ? matched : MOCK_ITEMS.slice(0, 2))
    setIsSearching(false)
  }

  return (
    <AppLayout showBack title="Find my item">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8">

        {/* Two-column layout on desktop: search left, info right */}
        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: search form */}
          <div>
            <h2 className="text-navy-900 text-xl lg:text-2xl font-bold">What did you lose?</h2>
            <p className="text-sm text-blue-500 mt-1 mb-5">
              Describe your item and our AI will look for possible matches.
            </p>

            <div className="mb-1">
              <label className="form-label">Item description</label>
              <textarea
                className="form-textarea min-h-[140px] lg:min-h-[160px]"
                placeholder="I lost a black leather wallet near the library. It has a small silver logo and my college ID inside."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <p className="text-[11px] text-gray-400 mb-5">
              Include item type, color, brand, location, date and unique characteristics.
            </p>

            <button
              onClick={handleAiSearch}
              disabled={isSearching || !description.trim()}
              className="btn-primary disabled:opacity-50 mb-3"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12"/>
                  </svg>
                  Searching…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill="white"/>
                  </svg>
                  Search with AI
                </>
              )}
            </button>

            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button onClick={() => navigate('/student/items')} className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Search Manually
            </button>
          </div>

          {/* Right: AI info box or results */}
          <div>
            {!results ? (
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-900/8 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill="#112240"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">AI understands</p>
                    <p className="text-xs text-blue-500">Natural descriptions and campus context</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Item type', 'Color', 'Brand', 'Location', 'Date'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-medium mb-1">Unique details</p>
                <p className="text-xs text-gray-400">Serial numbers, engravings, stickers, and other identifying features.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base">
                    {results.length > 0
                      ? `${results.length} possible match${results.length > 1 ? 'es' : ''} found`
                      : 'No matches found'}
                  </h3>
                  <button onClick={() => setResults(null)} className="text-xs text-navy-700 font-semibold hover:underline">
                    Clear
                  </button>
                </div>
                {results.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <p className="text-3xl mb-2">🔍</p>
                    <p className="text-sm">No items matched.</p>
                    <p className="text-xs mt-1">Try different keywords.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {results.map(item => <ItemCard key={item.id} item={item} />)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
