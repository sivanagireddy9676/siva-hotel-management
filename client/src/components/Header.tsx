import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { getUserFromToken, clearToken } from '../auth'

const Header: React.FC<{ onMenuToggle: () => void }> = ({ onMenuToggle }) => {
  const nav = useNavigate()
  const user = getUserFromToken()
  const handleLogout = () => { clearToken(); nav('/login') }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuToggle} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Hotel Management</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {user?.name ? (
            <>
              <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
              <Typography variant="body2">{user.name}</Typography>
            </>
          ) : null}
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
