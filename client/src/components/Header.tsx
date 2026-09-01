import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header: React.FC<{ onMenuToggle: () => void }> = ({ onMenuToggle }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuToggle} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Hotel Management</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
