import React from 'react';
import { Menu, MenuItem } from '@mui/material';

function ProfileMenu(props) {
  
  const {anchorEl, handleMenuClose} = props;

  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  )
}

export default ProfileMenu