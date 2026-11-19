/**
 * SideNav — fixed desktop sidebar (lg+ only, hidden on mobile/tablet)
 * Preserves all existing colours: navy-950 background, white text/icons
 */
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { getInitials } from '@/utils/formatters'

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
}

function NavIcon({ children }: { children: React.ReactNode }) {
  return <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{children}</span>
}

export function SideNav() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()
  const base = user?.role === 'admin' ? '/admin' : '/student'

  const studentNav: NavItem[] = [
    {
      to: `${base}/dashboard`,
      label: 'Home',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 10v11h5v-6h4v6h5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/items`,
      label: 'Browse Items',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/report/lost`,
      label: 'Report Lost',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/report/found`,
      label: 'Report Found',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/claims`,
      label: 'My Claims',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 4h2a2 2 0 002 2h6a2 2 0 002-2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/profile`,
      label: 'Profile',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      ),
    },
  ]

  const adminNav: NavItem[] = [
    {
      to: `${base}/dashboard`,
      label: 'Dashboard',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/items`,
      label: 'All Items',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/claims`,
      label: 'Claims',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/keys`,
      label: 'Key Tracking',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 11l9-9M21 2l-3 3M18 2l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      ),
    },
    {
      to: `${base}/profile`,
      label: 'Profile',
      icon: (
        <NavIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </NavIcon>
      ),
    },
  ]

  const navItems = user?.role === 'admin' ? adminNav : studentNav

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    /* Hidden on mobile/tablet, shown as fixed sidebar on lg+ */
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 bg-navy-950 flex-col z-40">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 7v9c0 7.5 5.1 14.5 12 17 6.9-2.5 12-9.5 12-17V7L16 2z"
              fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
            <path d="M11 16l3 3 7-7" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">CampusFind</p>
          <p className="text-white/50 text-[10px]">HKBK College of Engineering</p>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest ${
          user?.role === 'admin'
            ? 'bg-crimson-900/50 text-crimson-400 border border-crimson-800'
            : 'bg-teal-600/20 text-teal-400 border border-teal-600/30'
        }`}>
          {user?.role === 'admin' ? 'Admin' : 'Student'}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:bg-white/8 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User card at bottom */}
      <div className="px-3 pb-5 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1">
          <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{user ? getInitials(user.name) : 'U'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name ?? 'User'}</p>
            <p className="text-white/40 text-[10px] truncate">{user?.usn ?? ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <NavIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NavIcon>
          Logout
        </button>
      </div>
    </aside>
  )
}
