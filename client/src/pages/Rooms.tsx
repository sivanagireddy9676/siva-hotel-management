import React, { useEffect, useState } from 'react'
import { Typography, Grid, Paper, CircularProgress, Alert, Stack, IconButton, Button, Pagination } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../api/client'
import { Room } from '../types'
import RoomForm from '../components/RoomForm'
nconst Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [totalPages, setTotalPages] = useState(1)
  const [openForm, setOpenForm] = useState(false)
  const [editing, setEditing] = useState<Room | null>(null)
n  const fetch = async (p = page) => {
    setLoading(true)
    try {
      const res = await api.get<Room[]>('/api/rooms', { params: { page: p, limit } })
      const data = res.data
      setRooms(Array.isArray(data) ? data : (data.items || []))
      const totalCount = data.total || data.meta?.total || (Array.isArray(data) ? data.length : (data.items||[]).length)
      setTotalPages(Math.max(1, Math.ceil(totalCount / limit)))
    } catch (e) {
      console.error(e)
      setError('Failed to load rooms')
      setRooms([])
    } finally { setLoading(false) }
  }
n  useEffect(() => { fetch(page) }, [page])
  const handleRefresh = () => fetch(1)
  const handleAdd = () => { setEditing(null); setOpenForm(true) }
  const handleEdit = (r: Room) => { setEditing(r); setOpenForm(true) }
  const handleSaved = (r: Room) => { fetch(page) }
  const handleDelete = async (r: Room) => { if (!confirm('Delete room?')) return; try { await api.delete(`/api/rooms/${r.id}`); fetch(page) } catch (e) { console.error(e); alert('Delete failed') } }
n  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Rooms</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleRefresh}><RefreshIcon /></IconButton>
          <Button variant="contained" onClick={handleAdd}>Add Room</Button>
        </Stack>
      </Stack>
n      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
          <>
            <Grid container spacing={2}>
              {rooms.map(r => (
                <Grid item key={r.id} xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2 }}>
                    <div>{`Room ${r.number || r.id} — ${r.status || 'Unknown'}`}</div>
                    <div>{r.type ? `${r.type} • $${r.price ?? '—'}` : ''}</div>
                    <div>
                      <IconButton onClick={() => handleEdit(r)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDelete(r)}><DeleteIcon /></IconButton>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Pagination count={totalPages} page={page} onChange={(_,p) => setPage(p)} />
            </Stack>
          </>
        )}
      </Paper>
n      <RoomForm open={openForm} onClose={() => setOpenForm(false)} initial={editing} onSaved={handleSaved} />
    </div>
  )
}

export default Rooms
