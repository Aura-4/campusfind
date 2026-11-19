// Splash / intro screen — matches Screen 5 from screenshots
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import heroImg from '@/assets/hero.png'

export function SplashScreen() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const user = useAuthStore(s => s.user)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [isAuthenticated, user, navigate])

  return (
    <div className="app-shell relative min-h-screen overflow-hidden bg-navy-950">
      {/* Background campus photo */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/40 to-navy-950/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen py-16 px-6">
        {/* Top: College branding */}
        <div className="flex flex-col items-center gap-2 mt-4">
          {/* Shield icon */}
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 2L4 8v11c0 8.4 5.8 16.3 14 18.9C26.2 35.3 32 27.4 32 19V8L18 2z"
                fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
              <path d="M12 18l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-white font-semibold text-sm tracking-wide">HKBK College of Engineering</p>
          <p className="text-white/50 text-xs tracking-widest uppercase">Bengaluru · Est. 1997</p>
        </div>

        {/* Centre: Icon + title */}
        <div className="flex flex-col items-center gap-6">
          {/* Circular building icon */}
          <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="10" y="25" width="40" height="28" rx="2" stroke="white" strokeWidth="1.8" strokeOpacity="0.8"/>
              <path d="M5 25L30 8l25 17" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8"/>
              <rect x="22" y="38" width="16" height="15" rx="1" stroke="white" strokeWidth="1.5" strokeOpacity="0.8"/>
              <rect x="14" y="30" width="8" height="6" rx="1" fill="white" fillOpacity="0.3"/>
              <rect x="38" y="30" width="8" height="6" rx="1" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-white text-4xl font-bold tracking-tight">Lost &amp; Found</h1>
            <p className="text-white/60 text-sm mt-2">Lost something? We'll help you find it.</p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-2">
            <div className="w-6 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Bottom: Footer */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-white/40 text-xs">Lost &amp; Found Portal · 2026</p>
          <p className="text-white/30 text-[10px]">Student Services · HKBK College of Engineering</p>
        </div>
      </div>
    </div>
  )
}
