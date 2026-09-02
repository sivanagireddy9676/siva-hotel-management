import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, Box } from '@mui/material'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Bookings from './pages/Bookings'
import Rooms from './pages/Rooms'
import Customers from './pages/Customers'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

const App: React.FC = () => {
  const [open, setOpen] = React.useState(true)
  return (
    <>
      <CssBaseline />
      <Header onMenuToggle={() => setOpen(o => !o)} />
      <Box display="flex">
        <Sidebar open={open} />
        <Box component="main" flexGrow={1} className="app-content">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </>
  )
}

export default App
