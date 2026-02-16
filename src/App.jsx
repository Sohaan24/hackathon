import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Box bg="#020617" minH="100vh">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App