// ─────────────────────────────────────────────────────────────
// Generic API Response Envelopes
// ─────────────────────────────────────────────────────────────

export interface ApiSuccessResponse<T> {
  success: true
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string         // machine-readable, e.g. "ITEM_NOT_FOUND"
    message: string      // human-readable
    details?: Record<string, string[]>  // field-level validation errors
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

// ─── Upload Response ──────────────────────────────────────────

export interface UploadedFile {
  id: string
  url: string
  thumbnailUrl?: string
  filename: string
  size: number
  mimeType: string
  uploadedAt: string
}

export interface UploadResponse {
  files: UploadedFile[]
}

// ─── Common Query / Pagination ────────────────────────────────

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}
