import { useState } from 'react'
import { TopBar } from '@/components/shared/TopBar'
import { BottomNav } from '@/components/shared/BottomNav'
import { KEY_STATUS_META, KEY_CATEGORIES } from '@/utils/constants'
import { formatDate } from '@/utils/formatters'
import type { KeyRecord } from '@/types'

const MOCK_KEYS: KeyRecord[] = [
  {
    id: 'k1', keyIdentifier: 'LAB-301-A', label: 'Computer Lab 3rd Floor',
    category: 'Lab', status: 'Active',
    issuedTo: { id: 'u1', name: 'Nida Fatima', usn: 'HKBK-CSE-24018', role: 'student' },
    issuedAt: new Date(Date.now() - 604800000).toISOString(),
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    updatedAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    id: 'k2', keyIdentifier: 'SR-101-B', label: 'Staff Room Ground Floor',
    category: 'Staff Room', status: 'Revoked',
    issuedTo: { id: 'u2', name: 'Arjun Sharma', usn: 'HKBK-ME-24032', role: 'student' },
    issuedAt: new Date(Date.now() - 1209600000).toISOString(),
    revokedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export function AdminKeysPage() {
  const [keys, setKeys] = useState<KeyRecord[]>(MOCK_KEYS)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ keyIdentifier: '', label: '', category: '', issuedToUsn: '' })

  const setF = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const newKey: KeyRecord = {
      id: `k${Date.now()}`,
      keyIdentifier: form.keyIdentifier,
      label: form.label,
      category: form.category as KeyRecord['category'],
      status: 'Active',
      issuedTo: form.issuedToUsn ? { id: 'u-new', name: 'Unknown', usn: form.issuedToUsn, role: 'student' } : undefined,
      issuedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setKeys(prev => [newKey, ...prev])
    setShowAdd(false)
    setForm({ keyIdentifier: '', label: '', category: '', issuedToUsn: '' })
  }

  const handleRevoke = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'Revoked', revokedAt: new Date().toISOString(), updatedAt: new Date().toISOString() } : k))
  }

  return (
    <div className="app-shell min-h-screen bg-surface flex flex-col">
      <TopBar />

      <main className="flex-1 overflow-y-auto pb-28">
        <div className="bg-navy-900 px-4 pt-4 pb-6 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Key Tracking</h2>
            <p className="text-white/60 text-sm mt-0.5">{keys.length} keys tracked</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="bg-white/15 border border-white/20 rounded-full px-4 py-2 text-white text-xs font-semibold">
            + Add Key
          </button>
        </div>

        <div className="px-4 mt-4 flex flex-col gap-3">
          {keys.map(key => {
            const meta = KEY_STATUS_META[key.status]
            return (
              <div key={key.id} className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{key.keyIdentifier}</span>
                      <span className={`badge ${meta.bgClass} ${meta.colorClass}`}>{meta.label}</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{key.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{key.category}</p>
                    {key.issuedTo && (
                      <p className="text-xs text-gray-500 mt-1">
                        Issued to: <strong>{key.issuedTo.name}</strong> ({key.issuedTo.usn})
                      </p>
                    )}
                    {key.issuedAt && (
                      <p className="text-xs text-gray-400 mt-0.5">Since {formatDate(key.issuedAt)}</p>
                    )}
                  </div>
                  {key.status === 'Active' && (
                    <button
                      onClick={() => handleRevoke(key.id)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-full border border-red-300 text-red-500 text-xs font-semibold"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Add key sheet */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-t-3xl w-full max-w-[430px] p-6 pb-10">
            <h3 className="font-bold text-navy-900 text-base mb-4">Add Key Record</h3>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <input className="form-input" placeholder="Key Identifier (e.g. LAB-301-A)" value={form.keyIdentifier} onChange={e => setF('keyIdentifier', e.target.value)} required />
              <input className="form-input" placeholder="Label (e.g. Computer Lab 3rd Floor)" value={form.label} onChange={e => setF('label', e.target.value)} required />
              <div className="relative">
                <select className="form-select" value={form.category} onChange={e => setF('category', e.target.value)} required>
                  <option value="">Select category</option>
                  {KEY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
              <input className="form-input" placeholder="Issue to USN (optional)" value={form.issuedToUsn} onChange={e => setF('issuedToUsn', e.target.value)} />
              <button type="submit" className="btn-primary mt-1">Add Key</button>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
