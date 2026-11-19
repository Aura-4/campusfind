// ─────────────────────────────────────────────────────────────
// Key Store — physical key tracking state
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { keysApi } from '@/api/keysApi'
import type {
  KeyRecord,
  AddKeyRequest,
  RevokeKeyRequest,
  KeyListFilters,
} from '@/types'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'

interface KeyState {
  keys: KeyRecord[]
  selectedKey: KeyRecord | null
  pagination: { total: number; page: number; totalPages: number }
  isLoading: boolean
  isSubmitting: boolean
  error: string | null

  fetchKeys: (filters?: KeyListFilters) => Promise<void>
  fetchKeyById: (id: string) => Promise<void>
  addKey: (payload: AddKeyRequest) => Promise<KeyRecord>
  revokeKey: (payload: RevokeKeyRequest) => Promise<void>
  clearSelectedKey: () => void
  clearError: () => void
}

export const useKeyStore = create<KeyState>()(
  devtools(
    (set) => ({
      keys: [],
      selectedKey: null,
      pagination: { total: 0, page: 1, totalPages: 1 },
      isLoading: false,
      isSubmitting: false,
      error: null,

      fetchKeys: async (filters = { page: 1, limit: DEFAULT_PAGE_SIZE }) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await keysApi.getKeys(filters)
          set({
            keys: data.keys,
            pagination: {
              total: data.total,
              page: data.page,
              totalPages: data.totalPages,
            },
          })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load keys') })
        } finally {
          set({ isLoading: false })
        }
      },

      fetchKeyById: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await keysApi.getKeyById(id)
          set({ selectedKey: data })
        } catch (err) {
          set({ error: extractMessage(err, 'Failed to load key') })
        } finally {
          set({ isLoading: false })
        }
      },

      addKey: async (payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await keysApi.addKey(payload)
          set((state) => ({ keys: [data, ...state.keys] }))
          return data
        } catch (err) {
          const message = extractMessage(err, 'Failed to add key')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      revokeKey: async (payload) => {
        set({ isSubmitting: true, error: null })
        try {
          const { data } = await keysApi.revokeKey(payload)
          set((state) => ({
            keys: state.keys.map((k) =>
              k.id === payload.keyId ? data : k
            ),
            selectedKey:
              state.selectedKey?.id === payload.keyId
                ? data
                : state.selectedKey,
          }))
        } catch (err) {
          const message = extractMessage(err, 'Failed to revoke key')
          set({ error: message })
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      clearSelectedKey: () => set({ selectedKey: null }),

      clearError: () => set({ error: null }),
    }),
    { name: 'KeyStore' }
  )
)

function extractMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const e = err as { response?: { data?: { error?: { message?: string } } } }
    return e.response?.data?.error?.message ?? fallback
  }
  return fallback
}
