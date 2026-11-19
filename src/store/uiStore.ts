// ─────────────────────────────────────────────────────────────
// UI Store — modal state, global notifications, sidebar
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ModalId =
  | 'camera'
  | 'report-lost'
  | 'report-found'
  | 'claim'
  | 'add-key'
  | 'revoke-key'
  | 'confirm-action'
  | null

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

interface ConfirmDialog {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
}

interface UiState {
  // ─── Modals ──────────────────────────────────────────────
  activeModal: ModalId
  modalPayload: Record<string, unknown> | null

  // ─── Sidebar ─────────────────────────────────────────────
  isSidebarOpen: boolean

  // ─── Toast notifications ──────────────────────────────────
  toasts: Toast[]

  // ─── Confirm dialog ───────────────────────────────────────
  confirmDialog: ConfirmDialog | null

  // ─── Actions ─────────────────────────────────────────────
  openModal: (id: ModalId, payload?: Record<string, unknown>) => void
  closeModal: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  showConfirm: (dialog: ConfirmDialog) => void
  closeConfirm: () => void
}

let _toastCounter = 0

export const useUiStore = create<UiState>()(
  devtools(
    (set) => ({
      activeModal: null,
      modalPayload: null,
      isSidebarOpen: false,
      toasts: [],
      confirmDialog: null,

      openModal: (id, payload) =>
        set({ activeModal: id, modalPayload: payload ?? null }),

      closeModal: () => set({ activeModal: null, modalPayload: null }),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      addToast: (toast) => {
        const id = String(++_toastCounter)
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }))
        // Auto-dismiss after 4 s
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }))
        }, 4_000)
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      showConfirm: (dialog) => set({ confirmDialog: dialog }),

      closeConfirm: () => set({ confirmDialog: null }),
    }),
    { name: 'UiStore' }
  )
)
