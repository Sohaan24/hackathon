import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <Box bg="#020617" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box color="white">Loading...</Box>
      </Box>
    )
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function AppRoutes() {
  return (
    <Box bg="#020617" minH="100vh">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Box>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
