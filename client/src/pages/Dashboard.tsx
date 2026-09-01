import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Typography color="textSecondary" variant="subtitle2">{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Paper>
)

const Dashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Occupancy" value="72%" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Today's Revenue" value="$3,240" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="New Bookings" value="12" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Available Rooms" value="24" /></Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
