import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import MenuIcon from '@mui/icons-material/Menu';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Link, Outlet } from 'react-router-dom';
export default function Dashboard() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };




    const adminLinks = [
        {
            name: 'Add Events',
            path: '/dashboard/add-event',
            icon: <AddIcon />,
        },
    ]


    const navLinks = [
        {
            name: 'Home',
            path: '/',
            icon: <HomeIcon />,
        },
        {
            name: 'Events',
            path: '/',
            icon: <EventIcon />
        },
        {
            name: 'Reels',
            path: '/reels',
            icon: <VideoChatIcon />
        },
        {
            name: 'Gallery',
            path: '/gallery',
            icon: <CollectionsIcon />
        }
    ]


    const DrawerList = (
        <Box sx={{ width: 250, color: 'white', bgcolor: '#60A5FA', height: '100vh', marginTop: { lg: '0' } }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <h1 className="text-3xl sm:text-5xl font-bold gradient-text">Eventify</h1>
                </ListItem>
            </List>
            <Divider />
            <List>
                {adminLinks.map((link, index) => (
                    <Link to={link.path} key={index}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {navLinks.map((link, index) => (
                    <Link to={link.path} key={index}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}

            </List>
        </Box>
    );
    const DrawerListLg = (
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, flexDirection: { lg: 'column' }, width: 280, color: 'white', bgcolor: '#60A5FA', height: { lg: '100vh' }, marginTop: { lg: '0' } }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <h1 className="text-3xl mx-auto my-5 sm:text-5xl font-bold gradient-text">Eventify</h1>
                </ListItem>
            </List>
            <Divider sx={{border:'1px solid black'}}/>
            <List>
                {adminLinks.map((link, index) => (
                    <Link to={link.path} key={index}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider sx={{border:'1px solid black'}}/>
            <List>
                {navLinks.map((link, index) => (
                    <Link to={link.path} key={index}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}

            </List>
        </Box>
    );

    return (
        <div>
            <Button sx={{ display: { md: 'flex', lg: 'none' } }} onClick={toggleDrawer(true)}><MenuIcon/></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <div className='flex justify-between '>
                {DrawerListLg}
                <Outlet />
            </div>
        </div>
    );
}
