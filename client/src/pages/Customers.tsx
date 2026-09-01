import React, { useEffect, useState } from 'react'
import { Typography, Paper, List, ListItem, ListItemText, CircularProgress, Alert, Stack, IconButton, Button, Pagination } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../api/client'
import { Customer } from '../types'
import CustomerForm from '../components/CustomerForm'
nconst Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [totalPages, setTotalPages] = useState(1)
  const [openForm, setOpenForm] = useState(false)
  const [editing, setEditing] = useState<Customer | null>(null)
n  const fetch = async (p = page) => {
    setLoading(true)
    try {
      const res = await api.get<Customer[]>('/api/customers', { params: { page: p, limit } })
      const data = res.data
      setCustomers(Array.isArray(data) ? data : (data.items || []))
      const totalCount = data.total || data.meta?.total || (Array.isArray(data) ? data.length : (data.items||[]).length)
      setTotalPages(Math.max(1, Math.ceil(totalCount / limit)))
    } catch (e) {
      console.error(e)
      setError('Failed to load customers')
      setCustomers([])
    } finally { setLoading(false) }
  }
n  useEffect(() => { fetch(page) }, [page])
  const handleRefresh = () => fetch(1)
  const handleAdd = () => { setEditing(null); setOpenForm(true) }
  const handleEdit = (c: Customer) => { setEditing(c); setOpenForm(true) }
  const handleSaved = (c: Customer) => { fetch(page) }
  const handleDelete = async (c: Customer) => { if (!confirm('Delete customer?')) return; try { await api.delete(`/api/customers/${c.id}`); fetch(page) } catch (e) { console.error(e); alert('Delete failed') } }
n  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Customers</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleRefresh}><RefreshIcon /></IconButton>
          <Button variant="contained" onClick={handleAdd}>Add Customer</Button>
        </Stack>
      </Stack>
n      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
          <>
            <List>
              {customers.map(c => (
                <ListItem key={c.id} secondaryAction={(
                  <>
                    <IconButton onClick={() => handleEdit(c)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(c)}><DeleteIcon /></IconButton>
                  </>
                )}>
                  <ListItemText primary={c.name} secondary={c.email} />
                </ListItem>
              ))}
            </List>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination count={totalPages} page={page} onChange={(_,p) => setPage(p)} />
            </Stack>
          </>
        )}
      </Paper>
n      <CustomerForm open={openForm} onClose={() => setOpenForm(false)} initial={editing} onSaved={handleSaved} />
    </div>
  )
}

export default Customers
