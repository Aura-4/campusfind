// Login page — dark navy design matching profile screen aesthetic
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store'

export function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore(s => s.login)
  const isLoading = useAuthStore(s => s.isLoading)

  const [usn, setUsn] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!usn.trim() || !password.trim()) {
      setError('Please enter your USN and password.')
      return
    }
    try {
      await setAuth({ usn: usn.trim(), password })
      const user = useAuthStore.getState().user
      navigate(user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard', { replace: true })
    } catch {
      setError('Invalid credentials. Use any USN + password for demo.')
    }
  }

  return (
    <div className="app-shell min-h-screen bg-navy-950 flex flex-col">
      {/* Top decorative area */}
      <div className="bg-navy-900 px-6 pt-16 pb-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 2L4 8v11c0 8.4 5.8 16.3 14 18.9C26.2 35.3 32 27.4 32 19V8L18 2z"
              fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5"/>
            <path d="M12 18l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold">CampusFind</h1>
        <p className="text-white/50 text-xs mt-1 tracking-wide">HKBK College of Engineering</p>
      </div>

      {/* Form card */}
      <div className="flex-1 bg-surface rounded-t-3xl px-6 pt-8 pb-10 -mt-4">
        <h2 className="text-navy-900 text-xl font-bold mb-1">Welcome back</h2>
        <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="form-label">College USN / ID</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. HKBK-CSE-24018"
              value={usn}
              onChange={e => setUsn(e.target.value)}
              autoCapitalize="characters"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPass ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Demo hint */}
          <div className="bg-navy-900/5 rounded-xl px-3 py-2.5 text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">Demo credentials:</p>
            <p>Student: any USN + any password</p>
            <p>Admin: use USN <strong>ADMIN</strong></p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary mt-2 disabled:opacity-60"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-navy-700 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}
