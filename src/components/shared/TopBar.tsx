import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { getInitials } from '@/utils/formatters'

interface TopBarProps {
  showBack?: boolean
  title?: string
  transparent?: boolean
}

export function TopBar({ showBack, title, transparent }: TopBarProps) {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)

  return (
    <header
      className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4 ${
        transparent ? 'bg-transparent' : 'bg-navy-900'
      }`}
    >
      {/* Left: logo or back */}
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          /* Logo — hidden on desktop because SideNav shows it */
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 7v9c0 7.5 5.1 14.5 12 17 6.9-2.5 12-9.5 12-17V7L16 2z"
                  fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                <path d="M11 16l3 3 7-7" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">CampusFind</p>
              <p className="text-white/60 text-[10px]">HKBK College of Engineering</p>
            </div>
          </div>
        )}

        {title && (
          <span className="text-white font-semibold text-base lg:text-lg">{title}</span>
        )}

        {/* Desktop: page title area when no back button and no title — show breadcrumb placeholder */}
        {!showBack && !title && (
          <span className="hidden lg:block text-white/60 text-sm">
            {/* Intentionally empty — pages control their own headings */}
          </span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold leading-none">3</span>
        </button>

        {/* Avatar — desktop shows name too */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user ? getInitials(user.name) : 'U'}
            </span>
          </div>
          <span className="hidden lg:block text-white text-sm font-medium">
            {user?.name.split(' ')[0] ?? 'User'}
          </span>
        </div>
      </div>
    </header>
  )
}
