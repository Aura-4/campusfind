import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { AppLayout } from '@/components/shared/AppLayout'
import { MOCK_ITEMS } from '@/dev/mockItems'
import { ItemCard } from '@/components/shared/ItemCard'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const firstName = user?.name.split(' ')[0] ?? 'there'
  const recentItems = MOCK_ITEMS.slice(0, 6)

  return (
    <AppLayout>
      {/* Page header */}
      <div className="bg-navy-900 px-5 sm:px-6 lg:px-8 pt-5 pb-10 lg:pt-8 lg:pb-12">
        <h2 className="text-white text-xl lg:text-2xl font-bold">
          {getGreeting()}, {firstName} 👋
        </h2>
        <p className="text-white/60 text-sm mt-0.5">What would you like to do today?</p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 -mt-5">

        {/* ── Two action cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 lg:gap-4 max-w-2xl">

          {/* LOST card */}
          <button
            onClick={() => navigate('/student/items?type=lost')}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-crimson-700 to-crimson-900
                       p-5 lg:p-6 flex flex-col items-start text-left
                       min-h-[220px] lg:min-h-[260px]
                       hover:opacity-95 active:opacity-90 transition-opacity shadow-card-dark cursor-pointer"
          >
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2"/>
                  <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">LOST</span>
            </div>
            <h3 className="text-white font-bold text-base lg:text-lg leading-snug">Lost something on campus?</h3>
            <p className="text-white/60 text-xs lg:text-sm mt-1.5 leading-relaxed">Search reported items and find your belongings.</p>
            <div className="mt-auto w-full">
              <div className="flex justify-center mb-3">
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none" opacity="0.5">
                  <circle cx="34" cy="30" r="18" stroke="white" strokeWidth="2"/>
                  <path d="M47 43l10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <rect x="10" y="40" width="20" height="14" rx="2" stroke="white" strokeWidth="1.5"/>
                  <rect x="14" y="36" width="12" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="flex items-center gap-1 text-white text-xs font-semibold">
                <span>Find My Item</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </button>

          {/* FOUND card */}
          <button
            onClick={() => navigate('/student/report/found')}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-navy-700 to-navy-950
                       p-5 lg:p-6 flex flex-col items-start text-left
                       min-h-[220px] lg:min-h-[260px]
                       hover:opacity-95 active:opacity-90 transition-opacity shadow-card-dark cursor-pointer"
          >
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">FOUND</span>
            </div>
            <h3 className="text-white font-bold text-base lg:text-lg leading-snug">Found something?</h3>
            <p className="text-white/60 text-xs lg:text-sm mt-1.5 leading-relaxed">Help return it to its rightful owner.</p>
            <div className="mt-auto w-full">
              <div className="flex justify-center mb-3">
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none" opacity="0.5">
                  <path d="M40 50 C20 50 10 35 10 25 C10 15 20 10 30 15 L40 20 L50 15 C60 10 70 15 70 25 C70 35 60 50 40 50Z" stroke="white" strokeWidth="2" fill="none"/>
                  <circle cx="40" cy="28" r="8" stroke="white" strokeWidth="1.5"/>
                  <path d="M36 28l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-1 text-white text-xs font-semibold">
                <span>Report Found Item</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* ── Recent Reports ── */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-bold text-sm lg:text-base">Recent Reports</h3>
            <button
              onClick={() => navigate('/student/items')}
              className="text-navy-700 text-xs lg:text-sm font-semibold hover:underline"
            >
              See all
            </button>
          </div>
          {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {recentItems.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
