// ─────────────────────────────────────────────────────────────
// Item Store — lost & found item state
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { itemsApi } from '@/api/itemsApi'
import type {
  Item,
  ItemListFilters,
  ReportItemRequest,
  UpdateItemStatusRequest,
} from '@/types'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'

interface ItemState {
  // ─── State ──────────────────────────────────────────────
  items: Item[]
  myItems: Item[]
  selectedItem: Item | null
  pagination: {
    total: number
    page: number
    totalPages: number
  }
  filters: ItemListFilters
  isLoading: boolean
  isSubmitting: boolean
  error: string | null

  // ─── Actions ─────────────────────────────────────────────
  fetchItems: (filters?: ItemListFilters) => Promise<void>
  fetchMyItems: (filters?: ItemListFilters) => Promise<void>
  fetchItemById: (id: string) => Promise<void>
  reportLost: (payload: ReportItemRequest) => Promise<Item>
  reportFound: (payload: ReportItemRequest) => Promise<Item>
  updateItemStatus: (
    id: string,
    payload: UpdateItemStatusRequest
  ) => Promise<void>
  setFilters: (filters: Partial<ItemListFilters>) => void
  resetFilters: () => void
  clearSelectedItem: () => void
  clearError: () => void
}

const DEFAULT_FILTERS: ItemListFilters = {
  page: 1,
  limit: DEFAULT_PAGE_SIZE,
}

export const useItemStore = create<ItemState>()(
  devtools(
    (set, get) => ({
      // ─── Initial state ──────────────────────────────────
      items: [],
      myItems: [],
      selectedItem: null,
      pagination: { total: 0, page: 1, totalPages: 1 },
      filters: DEFAULT_FILTERS,
      isLoading: false,
      isSubmitting: false,
      error: null,

      // ─── Fetch all items ─────────────────────────────────
      fetchItems: async (overrides = {}) => {
        const filters = { ...get().filters, ...overrides }
        set({ isLoading: true, error: null, filters })
        try {
          const { data } = await itemsApi.getItems(filters)
          set({
            items: data.items,
            pagination: { total: data.total, page: data.page, totalPages: data.totalPages },
          })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load items') })
        } finally {
          set({ isLoading: false })
        }
      },

      // ─── Fetch current user's items ───────────────────────
      fetchMyItems: async (overrides = {}) => {
        const filters = { ...DEFAULT_FILTERS, ...overrides }
        set({ isLoading: true, error: null })
        try {
          const { data } = await itemsApi.getMyItems(filters)
          set({
            myItems: data.items,
            pagination: {
              total: data.total,
              page: data.page,
              totalPages: data.totalPages,
            },
          })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load your items') })
        } finally {
          set({ isLoading: false })
        }
      },

      // ─── Fetch single item ────────────────────────────────
      fetchItemById: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await itemsApi.getItemById(id)
          set({ selectedItem: data })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load item') })
        } finally {
          set({ isLoading: false })
        }
      },

      // ─── Report lost ──────────────────────────────────────
      reportLost: async (payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await itemsApi.reportLost(payload)
          set((state) => ({ myItems: [data, ...state.myItems] }))
          return data
        } catch (err) {
          const message = extractMessage(err, 'Failed to report item')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      // ─── Report found ─────────────────────────────────────
      reportFound: async (payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await itemsApi.reportFound(payload)
          set((state) => ({ myItems: [data, ...state.myItems] }))
          return data
        } catch (err) {
          const message = extractMessage(err, 'Failed to report item')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      // ─── Admin: update item status ────────────────────────
      updateItemStatus: async (id, payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await itemsApi.updateStatus(id, payload)
          // Update in-place across all lists
          set((state) => ({
            items: state.items.map((i) => (i.id === id ? data : i)),
            myItems: state.myItems.map((i) => (i.id === id ? data : i)),
            selectedItem:
              state.selectedItem?.id === id ? data : state.selectedItem,
          }))
        } catch (err) {
          const message = extractMessage(err, 'Failed to update status')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      // ─── Filter helpers ───────────────────────────────────
      setFilters: (partial) =>
        set((state) => ({
          filters: { ...state.filters, ...partial, page: 1 },
        })),

      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      clearSelectedItem: () => set({ selectedItem: null }),

      clearError: () => set({ error: null }),
    }),
    { name: 'ItemStore' }
  )
)

// ─── Helpers ──────────────────────────────────────────────────

function extractMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const e = err as { response?: { data?: { error?: { message?: string } } } }
    return e.response?.data?.error?.message ?? fallback
  }
  return fallback
}
