// ─────────────────────────────────────────────────────────────
// Date, text and display formatters
// ─────────────────────────────────────────────────────────────

/**
 * Format an ISO date string to a readable date.
 * e.g. "2024-03-15T10:30:00Z" → "15 Mar 2024"
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format an ISO date string to a readable date + time.
 * e.g. "2024-03-15T10:30:00Z" → "15 Mar 2024, 10:30 AM"
 */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Returns a relative time string.
 * e.g. "2 days ago", "just now"
 */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return formatDate(iso)
}

/**
 * Truncate a string to maxLength, appending "…" if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 1) + '…'
}

/**
 * Capitalise the first letter of each word.
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Format a file size in bytes to a human-readable string.
 * e.g. 1048576 → "1 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Returns initials from a full name.
 * e.g. "Mohammed Raza" → "MR"
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}
