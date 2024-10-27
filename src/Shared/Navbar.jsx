import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import Button_Customize from "../Shared/Button_Customize";
import useAuth from "../hooks/useAuth";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  styled,
  ClickAwayListener,
  Paper,
} from '@mui/material';
import { FaHome, FaCalendarAlt, FaPlayCircle, FaImages, FaTachometerAlt, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const CustomAppBar = styled(AppBar)({
  backgroundColor: 'white',
  color: 'black',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.25rem',
  color: '#2563eb',
});

const Navbar = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleAvatarClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    setShowLogout(false);
    logout();
  };

  const menuItems = user ? [
    { text: 'Home', icon: <FaHome />, path: '/' },
    { text: 'Events', icon: <FaCalendarAlt />, path: '/event' },
    { text: 'Reels', icon: <FaPlayCircle />, path: '/reels' },
    { text: 'Gallery', icon: <FaImages />, path: '/gallery' },
    { text: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
  ] : [];

  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.photoURL || 'https://avatars.githubusercontent.com/u/86664820?v=4'}
            alt="User avatar"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="subtitle1" fontWeight="medium">
            {user?.displayName || 'User'}
          </Typography>
        </Box>
      )}

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  '& .MuiListItemIcon-root': {
                    color: '#2563eb',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#2563eb',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <IconWrapper>{item.icon}</IconWrapper>
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        {user ? (
          <Button_Customize
            onClick={handleLogout}
            name={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaSignOutAlt />
                Logout
              </Box>
            }
            className="w-full"
          />
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button_Customize
              component={Link}
              to="/login"
              name={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaSignInAlt />
                  Login
                </Box>
              }
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            />
          </Link>

        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="sticky">
        <Box sx={{ px: { xs: 2, lg: 1, xl: 20 }, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  fontFamily: 'serif',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: '#2563eb',
                }}
              >
                Eventify
              </Typography>
            </Link>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3, minHeight: '64px' }}>
              {menuItems.map((item) => (
                <Link key={item.text} to={item.path} style={{ textDecoration: 'none' }}>
                  <Typography sx={{ fontWeight: 600, color: 'black', '&:hover': { color: '#2563eb' } }}>
                    {item.text}
                  </Typography>
                </Link>
              ))}

              {user ? (
                <ClickAwayListener onClickAway={() => setShowLogout(false)}>
                  <Box>
                    <IconButton sx={{ p: 0 }} onClick={handleAvatarClick}>
                      <Avatar src={user?.photoURL || 'https://avatars.githubusercontent.com/u/86664820?v=4'} alt="User avatar" />
                    </IconButton>
                    {showLogout && (
                      <Paper sx={{ position: 'absolute', mt: 1, mr: 16, p: 1 }}>
                        <Button_Customize
                          onClick={handleLogout}
                          name="Logout"
                          className="w-full"
                          icon={<FaSignOutAlt />}
                        />
                      </Paper>
                    )}
                  </Box>
                </ClickAwayListener>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button_Customize name="Login" className="bg-blue-600 text-white hover:bg-blue-700" />
                </Link>
              )}
            </Box>

            <IconButton sx={{ display: { md: 'none' } }} onClick={toggleDrawer(true)} color="inherit">
              {isOpen ? <IoClose size={24} /> : <HiMenu size={24} />}
            </IconButton>
          </Box>
        </Box>
      </CustomAppBar>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box' }, display: { md: 'none' } }}>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;
