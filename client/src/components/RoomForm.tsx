import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import api from '../api/client'
import { Room } from '../types'

interface Props { open: boolean; onClose: () => void; initial?: Room | null; onSaved: (r: Room) => void }

const RoomForm: React.FC<Props> = ({ open, onClose, initial, onSaved }) => {
  const [number, setNumber] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)
  const isEdit = !!initial

  useEffect(() => {
    setNumber(initial?.number || '')
    setType(initial?.type || '')
    setStatus(initial?.status || '')
    setPrice(initial?.price ?? '')
  }, [initial])

  const handleSave = async () => {
    setLoading(true)
    try {
      const body = { number, type, status, price: price === '' ? undefined : price }
      let res
      if (isEdit && initial?.id) {
        res = await api.put(`/api/rooms/${initial.id}`, body)
      } else {
        res = await api.post('/api/rooms', body)
      }
      onSaved(res.data)
      onClose()
    } catch (e) {
      console.error('Failed to save room', e)
      alert('Failed to save room')
    } finally { setLoading(false) }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? 'Edit Room' : 'Create Room'}</DialogTitle>
      <DialogContent>
        <TextField label="Number" fullWidth margin="normal" value={number} onChange={e => setNumber(e.target.value)} />
        <TextField label="Type" fullWidth margin="normal" value={type} onChange={e => setType(e.target.value)} />
        <TextField label="Status" fullWidth margin="normal" value={status} onChange={e => setStatus(e.target.value)} />
        <TextField label="Price" fullWidth margin="normal" value={price} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RoomForm
