import React, { useEffect, useState } from 'react'
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material'
import api from '../api/client'
import { Booking } from '../types'

const Bookings: React.FC = () => {
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get<Booking[]>('/api/bookings')
      .then(res => { if (mounted) setRows(res.data) })
      .catch(err => console.error('Failed to load bookings', err))
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
n  return (
    <div>
      <Typography variant="h4" gutterBottom>Bookings</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Guest</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.guest}</TableCell>
                  <TableCell>{r.room}</TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </div>
  )
}

export default Bookings
