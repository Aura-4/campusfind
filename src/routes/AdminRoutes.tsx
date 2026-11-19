// ─────────────────────────────────────────────────────────────
// Admin / HOD Routes — require role: admin or hod
// Visual components are PENDING Figma design delivery
// ─────────────────────────────────────────────────────────────

import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

export function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['admin', 'hod']} />}>
        <Route path="dashboard" element={<PlaceholderPage title="Admin Dashboard" />} />
        <Route path="items" element={<PlaceholderPage title="All Items" />} />
        <Route path="items/:id" element={<PlaceholderPage title="Item Detail (Admin)" />} />
        <Route path="claims" element={<PlaceholderPage title="Claims Management" />} />
        <Route path="users" element={<PlaceholderPage title="User Management" />} />
        <Route path="keys" element={<PlaceholderPage title="Key Management" />} />
      </Route>
    </Routes>
  )
}
