import React from 'react'
import { Box, Button, TextField, Paper, Typography } from '@mui/material'

const Login: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h6" gutterBottom>Sign in</Typography>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign in</Button>
      </Paper>
    </Box>
  )
}

export default Login
