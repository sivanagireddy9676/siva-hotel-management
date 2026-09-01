import React from 'react'
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material'

const Customers: React.FC = () => (
  <div>
    <Typography variant="h4" gutterBottom>Customers</Typography>
    <Paper>
      <List>
        <ListItem><ListItemText primary="Alice" secondary="alice@example.com" /></ListItem>
        <ListItem><ListItemText primary="Bob" secondary="bob@example.com" /></ListItem>
      </List>
    </Paper>
  </div>
)

export default Customers
