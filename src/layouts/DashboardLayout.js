//react
import {Outlet} from 'react-router-dom';
import {useState} from "react";
//@mui
import {
    Box,
    Drawer,
    IconButton,
} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import styled from "@emotion/styled";
import MuiDrawer from '@mui/material/Drawer';
//MUI icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
//components
import NavBar from "../components/NavBar";
//----------------------------------------------------------------------------------------------------------------------

const drawerWidth = 307;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerPermanent = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function DashboardLayout(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>

                <IconButton aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{
                                position: 'fixed',
                                top: '10px',
                                left: '10px',
                                display: {xs: 'block', sm: 'none'},
                                aspectRatio: '1/1',
                                width: '52px',
                                height: '52px',
                                border: (theme) => `3px solid ${theme.palette.secondary.main}`,
                                zIndex: (theme) => theme.zIndex.drawer - 1,
                                background:
                                    "rgba(64, 64, 64, 0.45)",
                            }}
                            color={'secondary'}
                >
                    <MenuIcon/>
                </IconButton>


                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{
                        position: 'fixed',
                        top: '10px',
                        left: '8px',
                        display: {xs: 'none', sm: open ? 'none' : 'block',},
                        width: '50px',
                        height: '50px',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                >
                    {open ? null : <MenuIcon/>}
                </IconButton>

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    <NavBar mobileOpen={mobileOpen} openNav={open}/>
                </Drawer>

                <DrawerPermanent
                    variant="permanent"
                    open={open}
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                    }}>
                    <IconButton
                        onClick={handleDrawerClose}
                        sx={{
                            position: 'fixed',
                            top: '10px',
                            left: '250px',
                            display: {xs: 'none', sm: open ? 'block' : 'none'},
                            width: '50px',
                            height: '50px',
                            zIndex: (theme) => theme.zIndex.drawer - 1,
                        }}
                    >
                        <ChevronLeftIcon/>
                    </IconButton>

                    <NavBar openNav={open}/>

                </DrawerPermanent>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Outlet/>

                </Box>
            </Box>
        </>
    );
}
