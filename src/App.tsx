import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { ExamProvider } from './contexts/ExamContext'
import { useAuth } from './hooks/useAuth'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

// Dashboard pages
import DashboardHome from './pages/dashboard/DashboardHome'
import RankPredictor from './pages/dashboard/RankPredictor'
import CollegePredictor from './pages/dashboard/CollegePredictor'
import MockAllocator from './pages/dashboard/MockAllocator'
import CutoffViewer from './pages/dashboard/CutoffViewer'
import CollegeDetails from './pages/dashboard/CollegeDetails'
import SavedPredictions from './pages/dashboard/SavedPredictions'
import FavouriteColleges from './pages/dashboard/FavouriteColleges'
import ProfilePage from './pages/dashboard/ProfilePage'
import SearchPage from './pages/dashboard/SearchPage'
import CollegeComparison from './pages/dashboard/CollegeComparison'
import BranchExplorer from './pages/dashboard/BranchExplorer'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />
      </Route>

      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={<ProtectedRoute><ExamProvider><DashboardLayout /></ExamProvider></ProtectedRoute>}>
        <Route index element={<DashboardHome />} />
        <Route path="rank-predictor" element={<RankPredictor />} />
        <Route path="college-predictor" element={<CollegePredictor />} />
        <Route path="mock-allocator" element={<MockAllocator />} />
        <Route path="cutoff-viewer" element={<CutoffViewer />} />
        <Route path="colleges/:id" element={<CollegeDetails />} />
        <Route path="saved" element={<SavedPredictions />} />
        <Route path="favourites" element={<FavouriteColleges />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="compare" element={<CollegeComparison />} />
        <Route path="branches" element={<BranchExplorer />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
