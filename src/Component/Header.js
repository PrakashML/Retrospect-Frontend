import * as React from 'react';
import ChatIcon from '../Asserts/chaticon.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 0.5 }}>
      <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <img src={ChatIcon} alt="Chat Icon" style={{width:'50%', marginLeft:'3%'}} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight:'bold', marginLeft:'-2.5%' }}>
            Retrospect
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}