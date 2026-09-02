import React, { useEffect, useState } from 'react'
import { Typography, Paper, TextField, Button, CircularProgress, Alert } from '@mui/material'
import api from '../api/client'
const Settings: React.FC = () => {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    let mounted = true
    api.get('/api/settings')
      .then(res => { if (mounted) setSettings(res.data || {}) })
      .catch(err => { console.error(err); if (mounted) setError('Failed to load settings') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/api/settings', settings)
      alert('Settings saved')
    } catch (e) {
      console.error(e)
      alert('Save failed')
    } finally { setSaving(false) }
  }
  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>
  return (
    <div>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Paper sx={{ p: 2 }}>
        <TextField label="Hotel name" fullWidth margin="normal" value={settings.hotelName || ''} onChange={e => setSettings({ ...settings, hotelName: e.target.value })} />
        <TextField label="Contact email" fullWidth margin="normal" value={settings.contactEmail || ''} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} />
        <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ mt: 2 }}>{saving ? 'Saving...' : 'Save'}</Button>
      </Paper>
    </div>
  )
}

export default Settings
