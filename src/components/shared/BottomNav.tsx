/**
 * BottomNav — mobile/tablet only (hidden on lg+)
 * Desktop uses SideNav instead.
 */
import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store'
import React from 'react'

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3l9 9" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10v11h5v-6h4v6h5V10" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#112240"/>
      <path d="M14 8v12M8 14h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function ClipboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="2" width="8" height="4" rx="1" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2"/>
      <path d="M5 4h2a2 2 0 002 2h6a2 2 0 002-2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2"/>
    </svg>
  )
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#112240' : '#9ca3af'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function BottomNav() {
  const user = useAuthStore(s => s.user)
  const base = user?.role === 'admin' ? '/admin' : '/student'

  const navItem = (
    to: string,
    label: string,
    Icon: (p: { active: boolean }) => React.ReactElement
  ) => (
    <NavLink
      to={`${base}${to}`}
      className="flex flex-col items-center gap-0.5 flex-1 py-2 min-w-0"
    >
      {({ isActive }) => (
        <>
          <Icon active={isActive} />
          <span className={`text-[10px] font-medium truncate ${isActive ? 'text-navy-900' : 'text-gray-400'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  )

  return (
    /* lg:hidden — desktop uses SideNav */
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {navItem('/dashboard', 'Home', HomeIcon)}
      {navItem('/items', 'Search', SearchIcon)}

      {/* Centre report button */}
      <NavLink
        to={`${base}/report/lost`}
        className="flex flex-col items-center gap-0.5 flex-1 py-2"
      >
        <PlusIcon />
        <span className="text-[10px] font-medium text-navy-900">Report</span>
      </NavLink>

      {navItem('/claims', 'Claims', ClipboardIcon)}
      {navItem('/profile', 'Profile', UserIcon)}
    </nav>
  )
}
