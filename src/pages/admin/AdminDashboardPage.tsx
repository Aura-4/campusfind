import { useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/shared/AppLayout'
import { MOCK_ITEMS } from '@/dev/mockItems'
import { ItemCard } from '@/components/shared/ItemCard'
import { useAuthStore } from '@/store'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)

  const stats = {
    total: MOCK_ITEMS.length,
    lost: MOCK_ITEMS.filter(i => i.type === 'lost').length,
    found: MOCK_ITEMS.filter(i => i.type === 'found').length,
    pending: MOCK_ITEMS.filter(i => i.status === 'Claim Requested' || i.status === 'Under Verification').length,
  }

  return (
    <AppLayout>
      <div className="bg-navy-900 px-4 sm:px-6 lg:px-8 pt-5 pb-10 lg:pt-8 lg:pb-12">
        <h2 className="text-white text-xl lg:text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-white/60 text-sm mt-0.5">Welcome back, {user?.name.split(' ')[0]}</p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 -mt-5">

        {/* Stats grid: 2 cols mobile → 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          {[
            { label: 'Total Items', value: stats.total, bg: 'bg-navy-800', text: 'text-white', sub: 'text-white/60' },
            { label: 'Pending Review', value: stats.pending, bg: 'bg-crimson-800', text: 'text-white', sub: 'text-white/60' },
            { label: 'Lost Reports', value: stats.lost, bg: 'bg-white', text: 'text-navy-900', sub: 'text-gray-400' },
            { label: 'Found Reports', value: stats.found, bg: 'bg-white', text: 'text-navy-900', sub: 'text-gray-400' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 lg:p-5 shadow-card`}>
              <p className={`text-3xl lg:text-4xl font-bold ${stat.text}`}>{stat.value}</p>
              <p className={`text-xs lg:text-sm mt-1 ${stat.sub}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions: 2 cols mobile → 4 cols desktop */}
        <div className="mb-6 lg:mb-8">
          <h3 className="text-gray-900 font-bold text-sm lg:text-base mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { emoji: '📋', label: 'Manage Items', path: '/admin/items' },
              { emoji: '✅', label: 'Review Claims', path: '/admin/claims' },
              { emoji: '🔑', label: 'Key Tracking', path: '/admin/keys' },
              { emoji: '👥', label: 'Users', path: '/admin/users' },
            ].map(action => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-2xl p-4 lg:p-5 shadow-card flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer"
              >
                <span className="text-2xl lg:text-3xl">{action.emoji}</span>
                <span className="text-xs lg:text-sm font-semibold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent items */}
        <div>
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h3 className="text-gray-900 font-bold text-sm lg:text-base">Recent Items</h3>
            <button onClick={() => navigate('/admin/items')} className="text-navy-700 text-xs lg:text-sm font-semibold hover:underline">
              See all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {MOCK_ITEMS.slice(0, 6).map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
