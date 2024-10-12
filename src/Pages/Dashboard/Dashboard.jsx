import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import EventIcon from '@mui/icons-material/Event';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import MenuIcon from '@mui/icons-material/Menu';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CollectionsIcon from '@mui/icons-material/Collections';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link, Outlet } from 'react-router-dom';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import CompareIcon from '@mui/icons-material/Compare';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import useAdmin from '../../hooks/useAdmin';
import useModerator from '../../hooks/useModerator';
export default function Dashboard() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const [isAdmin] = useAdmin()
    const [isModerator] = useModerator()

    const adminLinks = [
        {
            name: 'Add Events',
            path: '/dashboard/add-event',
            icon: <AddIcon />,
        },
        {
            name: 'Manage Events',
            path: '/dashboard/manage-event',
            icon: <CalendarMonthIcon />,
        },
        {
            name: 'Add Media',
            path: '/dashboard/add-media',
            icon: <PermMediaIcon />,
        },
        {
            name: 'Manage Users',
            path: '/dashboard/manage-users',
            icon: <GroupIcon />,
        },
        {
            name: 'Manage Media',
            path: '/dashboard/manage-media',
            icon: <CompareIcon />,
        },
        {
            name: 'Business Reports',
            path: '/dashboard/business-reports',
            icon: <AccountBalanceIcon />,
        },
        {
            name: 'Admin Profile',
            path: '/dashboard/admin-profile',
            icon: <AdminPanelSettingsIcon />,
        },
    ]

    const moderatorLinks = [
        {
            name: 'User Profile',
            path: '/dashboard/mod/user-profile',
            icon: <AccountCircleIcon />,
        },
        {
            name: 'Manage Events',
            path: '/dashboard/mod/manage-event',
            icon: <CalendarMonthIcon />,
        },
        {
            name: 'Add Report',
            path: '/dashboard/mod/add-report',
            icon: <ReportIcon />,
        },
        {
            name: 'Add Requirements',
            path: '/dashboard/mod/add-requirements',
            icon: <PostAddIcon />,
        },
        {
            name: 'Event Status',
            path: '/dashboard/mod/event-status',
            icon: <QueryStatsIcon />,
        },
        {
            name: 'Feedbacks',
            path: '/dashboard/mod/feedbacks',
            icon: <FeedbackIcon />,
        },
        {
            name: 'Manage Budgets',
            path: '/dashboard/mod/manage-budget',
            icon: <CalculateIcon />,
        },
    ]

    const userLinks = [
        {
            name: 'User Profile',
            path: '/dashboard/user/user-profile',
            icon: <AccountCircleIcon />,
        },
        {
            name: 'Booked Events',
            path: '/dashboard/user/booked-events',
            icon: <BookmarkAddedIcon />,
        },
        {
            name: 'Add Review',
            path: '/dashboard/user/add-review',
            icon: <RateReviewIcon />,
        },
        {
            name: 'View Reviews',
            path: '/dashboard/user/reviews',
            icon: <ReviewsIcon/>,
        },
        {
            name: 'Payment History',
            path: '/dashboard/user/payment-history',
            icon: <ReceiptIcon/>,
        },
        {
            name: 'Suggest New Events',
            path: '/dashboard/user/event-suggestions',
            icon: <TipsAndUpdatesIcon/>,
        },
        {
            name: 'Contact Support',
            path: '/dashboard/user/support',
            icon: <SupportAgentIcon/>,
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
        <Box sx={{ width: 250, color: 'white', bgcolor: '#2563EB', height: '100vh', marginTop: { lg: '0' } }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <h1 className="text-3xl sm:text-5xl font-bold gradient-text">Eventify</h1>
                </ListItem>
            </List>
            <Divider />
            <List>
                {isAdmin && adminLinks.map((link, index) => (
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
                {isModerator && moderatorLinks.map((link, index) => (
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
                {!isAdmin && !isModerator && userLinks.map((link, index) => (
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
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, flexDirection: { lg: 'column' }, width: 280, color: 'white', bgcolor: '#2563EB' ,marginTop: { lg: '0' } }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <h1 className="text-3xl mx-auto my-5 sm:text-5xl font-bold gradient-text">Eventify</h1>
                </ListItem>
            </List>
            <Divider sx={{border:'1px solid white'}}/>
            <List>
                {isAdmin && adminLinks.map((link, index) => (
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
                {isModerator && moderatorLinks.map((link, index) => (
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
                {!isAdmin && !isModerator && userLinks.map((link, index) => (
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
            <Divider sx={{border:'1px solid white'}}/>
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
            <div className='flex min-h-svh'>
                {DrawerListLg}
                <Outlet />
            </div>
        </div>
    );
}