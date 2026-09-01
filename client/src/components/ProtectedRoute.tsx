import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute: React.FC = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
