import React, { useEffect, useState } from 'react'
import { Typography, Paper, CircularProgress, Alert } from '@mui/material'
import api from '../api/client'
nconst Reports: React.FC = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
n  useEffect(() => {
    let mounted = true
    api.get('/api/reports')
      .then(res => { if (mounted) setData(res.data) })
      .catch(err => { console.error(err); if (mounted) setError('Failed to load reports') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])
n  return (
    <div>
      <Typography variant="h4" gutterBottom>Reports</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : error ? <Alert severity="error">{error}</Alert> : (
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(data, null, 2)}</pre>
        )}
      </Paper>
    </div>
  )
}

export default Reports
