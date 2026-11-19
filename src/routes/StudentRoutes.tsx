// ─────────────────────────────────────────────────────────────
// Student Routes — all require role: student
// Visual components are PENDING Figma design delivery
// ─────────────────────────────────────────────────────────────

import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

// Placeholder imports — replace with real pages after Figma delivery
import { PlaceholderPage } from '@/pages/PlaceholderPage'

export function StudentRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="dashboard" element={<PlaceholderPage title="Student Dashboard" />} />
        <Route path="report/lost" element={<PlaceholderPage title="Report Lost Item" />} />
        <Route path="report/found" element={<PlaceholderPage title="Report Found Item" />} />
        <Route path="items" element={<PlaceholderPage title="Browse Items" />} />
        <Route path="items/:id" element={<PlaceholderPage title="Item Detail" />} />
        <Route path="my-items" element={<PlaceholderPage title="My Reports" />} />
        <Route path="claims" element={<PlaceholderPage title="My Claims" />} />
        <Route path="profile" element={<PlaceholderPage title="Profile & Keys" />} />
      </Route>
    </Routes>
  )
}
