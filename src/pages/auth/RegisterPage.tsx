import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { DEPARTMENTS, YEAR_GROUPS } from '@/utils/constants'

export function RegisterPage() {
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)
  const isLoading = useAuthStore(s => s.isLoading)

  const [form, setForm] = useState({
    name: '', usn: '', email: '', password: '',
    department: '', yearGroup: '', phone: '',
  })
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.usn || !form.password || !form.department || !form.yearGroup) {
      setError('Please fill in all required fields.')
      return
    }
    try {
      await login({ usn: form.usn, password: form.password })
      navigate('/student/dashboard', { replace: true })
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="app-shell min-h-screen bg-navy-950 flex flex-col">
      <div className="bg-navy-900 px-6 pt-12 pb-8 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
          <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
            <path d="M18 2L4 8v11c0 8.4 5.8 16.3 14 18.9C26.2 35.3 32 27.4 32 19V8L18 2z"
              fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5"/>
            <path d="M12 18l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-white text-xl font-bold">Create Account</h1>
        <p className="text-white/50 text-xs mt-1">HKBK College of Engineering</p>
      </div>

      <div className="flex-1 bg-surface rounded-t-3xl px-6 pt-8 pb-28 -mt-4 overflow-y-auto">
        <h2 className="text-navy-900 text-lg font-bold mb-1">Student Registration</h2>
        <p className="text-gray-500 text-sm mb-6">Fill in your details to get started</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="form-label">Full Name *</label>
            <input className="form-input" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="form-label">College USN *</label>
            <input className="form-input" placeholder="e.g. HKBK-CSE-24018" value={form.usn} onChange={e => set('usn', e.target.value)} autoCapitalize="characters" />
          </div>
          <div>
            <label className="form-label">College Email</label>
            <input className="form-input" type="email" placeholder="you@hkbk.edu.in" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Department *</label>
            <div className="relative">
              <select className="form-select" value={form.department} onChange={e => set('department', e.target.value)}>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="form-label">Year / Semester *</label>
            <div className="relative">
              <select className="form-select" value={form.yearGroup} onChange={e => set('yearGroup', e.target.value)}>
                <option value="">Select year</option>
                {YEAR_GROUPS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input className="form-input" type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Password *</label>
            <input className="form-input" type="password" placeholder="Create a password" value={form.password} onChange={e => set('password', e.target.value)} />
          </div>

          {error && <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">{error}</p>}

          <button type="submit" disabled={isLoading} className="btn-primary mt-2 disabled:opacity-60">
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-navy-700 font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
