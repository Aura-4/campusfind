// ─────────────────────────────────────────────────────────────
// Items API
//
// BACKEND CONTRACT REQUIRED:
//   GET    /api/items                   → PaginatedItemsResponse
//   GET    /api/items/my                → PaginatedItemsResponse (reporter's own)
//   GET    /api/items/:id               → Item
//   POST   /api/items/lost              → Item   (multipart/form-data)
//   POST   /api/items/found             → Item   (multipart/form-data)
//   PATCH  /api/items/:id/status        → Item   (admin/hod only)
//   DELETE /api/items/:id               → void   (admin only)
//
// IMAGE UPLOAD:
//   The storage provider is configurable via VITE_IMAGE_STORAGE_PROVIDER.
//   Images are sent as multipart/form-data under the key "images[]".
//   The backend returns resolved URLs from whatever provider is configured.
// ─────────────────────────────────────────────────────────────

import apiClient from './axiosClient'
import type {
  Item,
  ReportItemRequest,
  UpdateItemStatusRequest,
  ItemListFilters,
  PaginatedItemsResponse,
} from '@/types'

/** Convert filter object to URLSearchParams */
function toParams(filters: ItemListFilters): URLSearchParams {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, String(value))
    }
  })
  return params
}

export const itemsApi = {
  /**
   * Fetch paginated + filtered list of all items.
   */
  getItems: (filters: ItemListFilters = {}) =>
    apiClient.get<PaginatedItemsResponse>('/items', {
      params: toParams(filters),
    }),

  /**
   * Fetch items reported by the currently authenticated user.
   */
  getMyItems: (filters: ItemListFilters = {}) =>
    apiClient.get<PaginatedItemsResponse>('/items/my', {
      params: toParams(filters),
    }),

  /**
   * Fetch a single item by ID.
   */
  getItemById: (id: string) => apiClient.get<Item>(`/items/${id}`),

  /**
   * Report a lost item. Accepts optional image files.
   */
  reportLost: (payload: ReportItemRequest) => {
    const form = buildFormData({ ...payload, type: 'lost' })
    return apiClient.post<Item>('/items/lost', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Report a found item. Accepts optional image files.
   */
  reportFound: (payload: ReportItemRequest) => {
    const form = buildFormData({ ...payload, type: 'found' })
    return apiClient.post<Item>('/items/found', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Update the status of an item (admin/hod only).
   */
  updateStatus: (id: string, payload: UpdateItemStatusRequest) =>
    apiClient.patch<Item>(`/items/${id}/status`, payload),

  /**
   * Delete an item (admin only).
   */
  deleteItem: (id: string) => apiClient.delete<void>(`/items/${id}`),
}

// ─── Helpers ──────────────────────────────────────────────────

function buildFormData(
  payload: ReportItemRequest & { type: string }
): FormData {
  const form = new FormData()

  form.append('type', payload.type)
  form.append('title', payload.title)
  form.append('description', payload.description)
  form.append('category', payload.category)
  form.append('location', payload.location)
  form.append('date', payload.date)

  if (payload.locationDetail) {
    form.append('locationDetail', payload.locationDetail)
  }

  payload.tags?.forEach((tag) => form.append('tags[]', tag))

  payload.images?.forEach((file) => form.append('images[]', file))

  return form
}
