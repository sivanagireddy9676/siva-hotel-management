import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BookIcon from '@mui/icons-material/Book'
import HotelIcon from '@mui/icons-material/Hotel'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC<{ open: boolean }> = ({ open }) => {
  const nav = useNavigate()
  return (
    <Drawer variant="persistent" open={open} sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}>
      <List>
        <ListItemButton onClick={() => nav('/dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => nav('/bookings')}>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItemButton>
        <ListItemButton onClick={() => nav('/rooms')}>
          <ListItemIcon><HotelIcon /></ListItemIcon>
          <ListItemText primary="Rooms" />
        </ListItemButton>
        <ListItemButton onClick={() => nav('/customers')}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton onClick={() => nav('/reports')}>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton onClick={() => nav('/settings')}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  )
}

export default Sidebar
