import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import api from '../api/client'
import { Booking } from '../types'

interface Props { open: boolean; onClose: () => void; initial?: Booking | null; onSaved: (b: Booking) => void }

const BookingForm: React.FC<Props> = ({ open, onClose, initial, onSaved }) => {
  const [guest, setGuest] = useState('')
  const [room, setRoom] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = !!initial

  useEffect(() => {
    setGuest(initial?.guest || '')
    setRoom(initial?.room || '')
    setStatus(initial?.status || '')
  }, [initial])

  const handleSave = async () => {
    setLoading(true)
    try {
      const body = { guest, room, status }
      let res
      if (isEdit && initial?.id) {
        res = await api.put(`/api/bookings/${initial.id}`, body)
      } else {
        res = await api.post('/api/bookings', body)
      }
      onSaved(res.data)
      onClose()
    } catch (e) {
      console.error('Failed to save booking', e)
      alert('Failed to save booking')
    } finally { setLoading(false) }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? 'Edit Booking' : 'Create Booking'}</DialogTitle>
      <DialogContent>
        <TextField label="Guest" fullWidth margin="normal" value={guest} onChange={e => setGuest(e.target.value)} />
        <TextField label="Room" fullWidth margin="normal" value={room} onChange={e => setRoom(e.target.value)} />
        <TextField label="Status" fullWidth margin="normal" value={status} onChange={e => setStatus(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BookingForm
