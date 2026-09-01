import React, { useEffect, useState } from 'react'
import { Typography, Paper, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material'
import api from '../api/client'
import { Customer } from '../types'
nconst Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
n  useEffect(() => {
    let mounted = true
    api.get<Customer[]>('/api/customers')
      .then(res => { if (mounted) setCustomers(res.data) })
      .catch(err => { console.error(err); if (mounted) setError('Failed to load customers') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
n  return (
    <div>
      <Typography variant="h4" gutterBottom>Customers</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
          <List>
            {customers.map(c => (
              <ListItem key={c.id}><ListItemText primary={c.name} secondary={c.email} /></ListItem>
            ))}
          </List>
        )}
      </Paper>
    </div>
  )
}

export default Customers
