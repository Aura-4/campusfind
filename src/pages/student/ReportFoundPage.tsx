import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/shared/AppLayout'
import { ITEM_CATEGORIES, CAMPUS_LOCATIONS } from '@/utils/constants'

export function ReportFoundPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', category: '', location: '',
    collectionPoint: 'HKBK Security Office',
    collectionTime: '', details: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.category || !form.location) return
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 900))
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => navigate('/student/dashboard'), 1800)
  }

  if (submitted) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-navy-900 text-xl font-bold text-center">Found Item Reported!</h2>
          <p className="text-gray-500 text-sm text-center">Thank you for helping return it to its owner.</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout showBack title="Report Found Item">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-8">
        <p className="text-sm text-gray-500 mb-6">Help reunite someone with their belongings.</p>

        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">

            <div className="lg:col-span-2">
              <label className="form-label">What did you find? *</label>
              <input className="form-input" placeholder="e.g. Blue water bottle"
                value={form.title} onChange={e => set('title', e.target.value)} />
            </div>

            <div>
              <label className="form-label">Category *</label>
              <div className="relative">
                <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                  <option value="">Select category</option>
                  {ITEM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Where did you find it? *</label>
              <div className="relative">
                <select className="form-select" value={form.location} onChange={e => set('location', e.target.value)}>
                  <option value="">Select campus location</option>
                  {CAMPUS_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Collection Point</label>
              <input className="form-input" placeholder="HKBK Security Office"
                value={form.collectionPoint} onChange={e => set('collectionPoint', e.target.value)} />
            </div>

            <div>
              <label className="form-label">Collection Time</label>
              <div className="relative">
                <input type="time" className="form-input pr-10"
                  value={form.collectionTime} onChange={e => set('collectionTime', e.target.value)} />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="form-label">Additional Details</label>
              <textarea className="form-textarea min-h-[90px]"
                placeholder="Found near the library entrance."
                value={form.details} onChange={e => set('details', e.target.value)} />
            </div>

            <div className="lg:col-span-2">
              <label className="form-label">Add Photos</label>
              <label className="flex items-center gap-3 w-full rounded-xl border-2 border-dashed border-gray-200 bg-white px-4 py-4 cursor-pointer hover:border-teal-500 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="#0d9488" strokeWidth="1.8"/>
                    <circle cx="12" cy="13" r="4" stroke="#0d9488" strokeWidth="1.8"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {images.length > 0 ? `${images.length} photo(s) selected` : 'Take photo or upload'}
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG or WebP · Max 5 MB each</p>
                </div>
                <input type="file" accept="image/*" multiple className="hidden"
                  onChange={e => setImages(Array.from(e.target.files ?? []))} />
              </label>
            </div>

            {/* Safe handover notice */}
            <div className="lg:col-span-2 flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                <path d="M12 2L4 7v5c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7L12 2z"
                  fill="#0d9488" fillOpacity="0.15" stroke="#0d9488" strokeWidth="1.5"/>
                <path d="M9 12l2 2 4-4" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800">Safe handover</p>
                <p className="text-xs text-teal-600 mt-0.5">Do not share private owner details in the description.</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <button type="submit" disabled={isSubmitting} className="btn-teal lg:w-auto lg:px-12 disabled:opacity-60">
                {isSubmitting ? 'Submitting…' : 'Submit Found Item'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
