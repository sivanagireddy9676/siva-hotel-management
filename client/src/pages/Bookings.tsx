import React, { useEffect, useState } from 'react'
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Button, IconButton, Stack, Pagination } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../api/client'
import { Booking } from '../types'
import BookingForm from '../components/BookingForm'
const Bookings: React.FC = () => {
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [openForm, setOpenForm] = useState(false)
  const [editing, setEditing] = useState<Booking | null>(null)
const fetch = async (p = page) => {
  setLoading(true)
  try {
    const res = await api.get<Booking[]>('/api/bookings', { params: { page: p, limit } })
    const data = res.data as any
    setRows(Array.isArray(data) ? data : (data.items || []))
    const tp = data && (data.totalPages || data.total || data.meta?.total)
    if (tp) {
      const totalCount = data.total || data.meta?.total || tp
      setTotalPages(Math.max(1, Math.ceil(totalCount / limit)))
    } else {
      setTotalPages(Math.max(1, Math.ceil((Array.isArray(data) ? data.length : (data.items || []).length) / limit)))
    }
  } catch (e) {
    console.error('Failed to load bookings', e)
    setRows([])
  } finally { setLoading(false) }
}
  useEffect(() => { fetch(page) }, [page])
  const handleRefresh = () => fetch(1)
  const handleAdd = () => { setEditing(null); setOpenForm(true) }
  const handleEdit = (b: Booking) => { setEditing(b); setOpenForm(true) }
  const handleSaved = (_b: Booking) => { fetch(page) }
  const handleDelete = async (_b: Booking) => {
    if (!confirm('Delete booking?')) return
    try { await api.delete(`/api/bookings/${_b.id}`); fetch(page) } catch (e) { console.error(e); alert('Delete failed') }
  }
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Bookings</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleRefresh}><RefreshIcon /></IconButton>
          <Button variant="contained" onClick={handleAdd}>Add Booking</Button>
        </Stack>
      </Stack>
      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Guest</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.guest}</TableCell>
                    <TableCell>{r.room}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(r)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDelete(r)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination count={totalPages} page={page} onChange={(_,p) => setPage(p)} />
            </Stack>
          </>
        )}
      </Paper>
      <BookingForm open={openForm} onClose={() => setOpenForm(false)} initial={editing} onSaved={handleSaved} />
    </div>
  )
}

export default Bookings
