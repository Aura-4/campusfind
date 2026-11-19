// ─────────────────────────────────────────────────────────────
// PlaceholderPage — temporary page shell
//
// PURPOSE: Keeps routing wired and type-checking valid while
// awaiting Figma design references. This file will be DELETED
// and replaced with real page implementations in Phase 2+.
//
// DO NOT add styles or layout here — this is scaffolding only.
// ─────────────────────────────────────────────────────────────

interface PlaceholderPageProps {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div data-page={title} style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>[PLACEHOLDER] {title}</h1>
      <p>
        This page is pending Figma design delivery. No UI decisions have been
        made here.
      </p>
    </div>
  )
}
