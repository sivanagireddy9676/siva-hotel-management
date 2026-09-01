import React from 'react'
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const sample = [
  { id: 'B001', guest: 'Alice', room: '101', status: 'Checked-in' },
  { id: 'B002', guest: 'Bob', room: '204', status: 'Reserved' }
]

const Bookings: React.FC = () => (
  <div>
    <Typography variant="h4" gutterBottom>Bookings</Typography>
    <Paper>
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
          {sample.map(r => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.guest}</TableCell>
              <TableCell>{r.room}</TableCell>
              <TableCell>{r.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
)

export default Bookings
