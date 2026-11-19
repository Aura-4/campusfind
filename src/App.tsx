import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Auth
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'

// Splash
import { SplashScreen } from '@/pages/SplashScreen'

// Student pages
import { DashboardPage } from '@/pages/student/DashboardPage'
import { FindItemPage } from '@/pages/student/FindItemPage'
import { ItemsPage } from '@/pages/student/ItemsPage'
import { ItemDetailPage } from '@/pages/student/ItemDetailPage'
import { ReportLostPage } from '@/pages/student/ReportLostPage'
import { ReportFoundPage } from '@/pages/student/ReportFoundPage'
import { ClaimsPage } from '@/pages/student/ClaimsPage'
import { ProfilePage } from '@/pages/student/ProfilePage'

// Admin pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminItemsPage } from '@/pages/admin/AdminItemsPage'
import { AdminClaimsPage } from '@/pages/admin/AdminClaimsPage'
import { AdminKeysPage } from '@/pages/admin/AdminKeysPage'

// Route guards
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash / root */}
        <Route path="/" element={<SplashScreen />} />

        {/* Public auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student/dashboard" element={<DashboardPage />} />
          <Route path="/student/items" element={<ItemsPage />} />
          <Route path="/student/items/:id" element={<ItemDetailPage />} />
          <Route path="/student/find" element={<FindItemPage />} />
          <Route path="/student/report/lost" element={<ReportLostPage />} />
          <Route path="/student/report/found" element={<ReportFoundPage />} />
          <Route path="/student/claims" element={<ClaimsPage />} />
          <Route path="/student/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'hod']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/items" element={<AdminItemsPage />} />
          <Route path="/admin/items/:id" element={<ItemDetailPage />} />
          <Route path="/admin/claims" element={<AdminClaimsPage />} />
          <Route path="/admin/keys" element={<AdminKeysPage />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={
          <div className="app-shell min-h-screen bg-surface flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-5xl">🚫</p>
            <h2 className="text-navy-900 font-bold text-xl">Access Denied</h2>
            <p className="text-gray-500 text-sm">You don't have permission to view this page.</p>
            <a href="/login" className="btn-primary w-auto px-8">Back to Login</a>
          </div>
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
