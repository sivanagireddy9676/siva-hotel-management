import React from 'react'
import { Typography, Grid, Paper } from '@mui/material'

const Rooms: React.FC = () => (
  <div>
    <Typography variant="h4" gutterBottom>Rooms</Typography>
    <Grid container spacing={2}>
      {[101,102,103,104].map(n => (
        <Grid item key={n} xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>{`Room ${n} — Available`}</Paper>
        </Grid>
      ))}
    </Grid>
  </div>
)

export default Rooms
