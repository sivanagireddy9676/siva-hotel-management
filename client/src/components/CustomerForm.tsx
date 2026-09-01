import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import api from '../api/client'
import { Customer } from '../types'

interface Props { open: boolean; onClose: () => void; initial?: Customer | null; onSaved: (c: Customer) => void }

const CustomerForm: React.FC<Props> = ({ open, onClose, initial, onSaved }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = !!initial

  useEffect(() => {
    setName(initial?.name || '')
    setEmail(initial?.email || '')
    setPhone(initial?.phone || '')
  }, [initial])

  const handleSave = async () => {
    setLoading(true)
    try {
      const body = { name, email, phone }
      let res
      if (isEdit && initial?.id) {
        res = await api.put(`/api/customers/${initial.id}`, body)
      } else {
        res = await api.post('/api/customers', body)
      }
      onSaved(res.data)
      onClose()
    } catch (e) {
      console.error('Failed to save customer', e)
      alert('Failed to save customer')
    } finally { setLoading(false) }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? 'Edit Customer' : 'Create Customer'}</DialogTitle>
      <DialogContent>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Phone" fullWidth margin="normal" value={phone} onChange={e => setPhone(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerForm
