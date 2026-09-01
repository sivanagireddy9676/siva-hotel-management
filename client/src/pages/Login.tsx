import React, { useState } from 'react'
import { Box, Button, TextField, Paper, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
n  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/api/auth/login', { email, password })
      const token = res?.data?.token
      if (token) {
        localStorage.setItem('token', token)
        nav('/dashboard')
      } else {
        setError('Invalid server response')
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }
n  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h6" gutterBottom>Sign in</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={submit} disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
      </Paper>
    </Box>
  )
}

export default Login
