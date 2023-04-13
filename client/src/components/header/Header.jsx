// import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../services/authServices';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice';
import logoImg from "../../assets/supplier-1.png"

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async(e)=>{
    await logoutUser();
    await dispatch(SET_LOGIN({flag: false, name:""}));
    localStorage.removeItem("name");
    navigate("/login");
  }

  const nameFirstLetter = name?.charAt(0).toUpperCase();

  //hovering effect
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };


  return (
    <div className='flex justify-between pt-4 pb-3 bg-slate-800 shadow-md shadow-lime-100 sm:px-8 body'>
      <a href='/'><img src={logoImg} className='w-10 h-10 rounded-md'/></a>
      <div className='flex'>
      <button className='btn btn-sm text-xl pt-1 mr-1 bg-slate-200 text-black hover:bg-slate-400 border-none'>
        <Link to="/add-product">Add Product</Link>
      </button>
  
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 40, height: 40, }} 
            style={{ marginTop:"-9px", fontWeight:"bold",  backgroundColor: isHovering ? '#0f172a' : '#f97316'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >{nameFirstLetter}</Avatar>
          </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          navigate("/contact-us");
          handleClose();
        }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Report Bug
        </MenuItem>
        <MenuItem onClick={() =>{
                        logout();
                        handleClose();
                    }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      </div>
    </div>
  )
}

export default Header
