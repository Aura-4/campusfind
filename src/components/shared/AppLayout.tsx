/**
 * AppLayout — responsive shell
 *
 * Mobile  (<lg):  TopBar at top + BottomNav fixed at bottom
 * Desktop (lg+):  Sidebar fixed on left + TopBar inside main area
 *
 * Every authenticated page renders inside <AppLayout>.
 * Unauthenticated pages (Login, Register, Splash) render standalone.
 */
import { SideNav } from './SideNav'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'

interface AppLayoutProps {
  children: React.ReactNode
  /** Show a back-arrow instead of the logo in the TopBar */
  showBack?: boolean
  /** Title shown next to back arrow */
  title?: string
}

export function AppLayout({ children, showBack, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <SideNav />

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-60">
        {/* TopBar: full width on all sizes */}
        <TopBar showBack={showBack} title={title} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav (hidden on desktop) ── */}
      <BottomNav />
    </div>
  )
}
