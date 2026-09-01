import React, { useEffect, useState } from 'react'
import { Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material'
import api from '../api/client'
import { Room } from '../types'

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
n  useEffect(() => {
    let mounted = true
    api.get<Room[]>('/api/rooms')
      .then(res => { if (mounted) setRooms(res.data) })
      .catch(err => { console.error(err); if (mounted) setError('Failed to load rooms') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
n  return (
    <div>
      <Typography variant="h4" gutterBottom>Rooms</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
          <Grid container spacing={2}>
            {rooms.map(r => (
              <Grid item key={r.id} xs={12} sm={6} md={3}>
                <Paper sx={{ p: 2 }}>{`Room ${r.number || r.id} — ${r.status || 'Unknown'}`}</Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </div>
  )
}

export default Rooms
