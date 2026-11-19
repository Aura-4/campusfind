import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { AppLayout } from '@/components/shared/AppLayout'
import { getInitials } from '@/utils/formatters'

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ProfilePage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const [darkMode, setDarkMode] = useState(true)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const toggleDark = () => {
    setDarkMode(v => {
      if (!v) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      return !v
    })
  }

  return (
    /* Profile page keeps dark background across the whole page */
    <div className="min-h-screen bg-navy-950 flex">
      {/* Import SideNav separately for the dark background page */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 bg-navy-950 border-r border-white/10 flex-col z-40">
        {/* Reuse SideNav by importing — but to avoid circular, inline a minimal version */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 7v9c0 7.5 5.1 14.5 12 17 6.9-2.5 12-9.5 12-17V7L16 2z"
              fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
            <path d="M11 16l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-white font-bold text-sm">CampusFind</p>
            <p className="text-white/50 text-[10px]">HKBK College of Engineering</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4">
          {[
            { label: 'Home', href: `/${user?.role === 'admin' ? 'admin' : 'student'}/dashboard` },
            { label: 'Browse Items', href: `/${user?.role === 'admin' ? 'admin' : 'student'}/items` },
            { label: 'Profile', href: `/${user?.role === 'admin' ? 'admin' : 'student'}/profile` },
          ].map(item => (
            <a key={item.label} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/8 hover:text-white transition-all">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 lg:pl-60 flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-navy-900 px-4 lg:px-8 pt-14 lg:pt-10 pb-8 flex flex-col items-center lg:items-start lg:flex-row lg:gap-6">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
            <span className="text-white text-2xl lg:text-3xl font-bold">{user ? getInitials(user.name) : 'U'}</span>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-white font-bold text-xl lg:text-2xl">{user?.name ?? 'Student'}</h2>
            <p className="text-white/50 text-sm mt-0.5">{user?.usn ?? ''}</p>
            <p className="text-white/40 text-xs mt-0.5">{user?.department ?? ''} · {user?.yearGroup ?? ''}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 lg:pb-8">
          {/* Desktop two-column layout */}
          <div className="px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">

            {/* Left: User info */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-3">Personal Details</p>
              <div className="bg-navy-800 rounded-2xl overflow-hidden">
                {[
                  { label: 'Name', value: user?.name ?? '—' },
                  { label: 'College email', value: user?.email ?? '—' },
                  { label: 'Department', value: user?.department ?? '—' },
                  { label: 'Semester', value: user?.yearGroup ?? '—' },
                  { label: 'College ID', value: user?.usn ?? '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 last:border-0">
                    <span className="text-white/50 text-sm">{label}</span>
                    <span className="text-white text-sm font-semibold text-right max-w-[55%] truncate">{value}</span>
                  </div>
                ))}
              </div>

              {/* Appearance */}
              <p className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-3 mt-6">Appearance</p>
              <div className="bg-navy-800 rounded-2xl px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="white" strokeWidth="1.8"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Dark Mode</p>
                    <p className="text-white/40 text-xs">{darkMode ? 'On · Use light appearance' : 'Off · Use dark appearance'}</p>
                  </div>
                </div>
                <button
                  onClick={toggleDark}
                  className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${darkMode ? 'bg-blue-500' : 'bg-white/20'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Right: Account menu */}
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-3">Account</p>
              <div className="bg-navy-800 rounded-2xl overflow-hidden">
                {[
                  { icon: '👤', label: 'Personal Information' },
                  { icon: '🔔', label: 'Notifications' },
                  { icon: '❓', label: 'Help & Support' },
                  { icon: '🔒', label: 'Privacy & Security' },
                  { icon: '🕐', label: 'Full History' },
                ].map(({ icon, label }) => (
                  <button key={label} className="list-row w-full text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{icon}</span>
                      <span className="text-white text-sm">{label}</span>
                    </div>
                    <span className="text-white/30"><ChevronRight /></span>
                  </button>
                ))}
                <button onClick={handleLogout} className="list-row w-full text-left border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                        stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-red-400 text-sm font-semibold">Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-white/10 flex items-center z-50">
          {[
            { href: `/${user?.role === 'admin' ? 'admin' : 'student'}/dashboard`, label: 'Home', emoji: '🏠' },
            { href: `/${user?.role === 'admin' ? 'admin' : 'student'}/items`, label: 'Search', emoji: '🔍' },
            { href: `/${user?.role === 'admin' ? 'admin' : 'student'}/claims`, label: 'Claims', emoji: '📋' },
            { href: `/${user?.role === 'admin' ? 'admin' : 'student'}/profile`, label: 'Profile', emoji: '👤' },
          ].map(item => (
            <a key={item.label} href={item.href} className="flex flex-col items-center gap-0.5 flex-1 py-2.5 text-white/60 hover:text-white transition-colors">
              <span className="text-lg">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
