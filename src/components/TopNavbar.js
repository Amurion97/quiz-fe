import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import {Grid} from "@mui/material";
import Search from "./Forms/NewNavbarComponent/Search";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function TopNavbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [searchValue, setSearchValue] = useState('');

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
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
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">

                <Toolbar>

                    <Grid container spacing={-2}>
                        <Grid xs={4}>
                            <Grid container spacing={0}>
                                <Grid item xs={2}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{display: {xs: 'none', sm: 'block'}}}
                                    >
                                        {/*<Select></Select>*/}
                                        <a href={'/'}>
                                            <img style={{width: 70, height: 60, borderRadius: "30%"}}
                                                 src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTY3dnw818v42oQ4urql3cTcRi-_2w6SYJg&usqp=CAU'}/>
                                        </a>

                                    </Typography>

                                </Grid>
                                <Grid item xs={10}>
                                    <Search>
                                    </Search>
                                </Grid>

                            </Grid>


                        </Grid>
                        <Grid xs={6}>
                            <Grid container>
                                <BottomNavigation sx={{ flexGrow: 1, backgroundColor: '#1976d2' }} value={value} onChange={handleChange}>
                                    <BottomNavigationAction
                                        label="Trang Chủ"
                                        value="recents"
                                        icon={<RestoreIcon/>}
                                        sx={{ color: '#191920', fontWeight: 'bold' }}
                                    />
                                    <BottomNavigationAction
                                        label="Hoạt Động"
                                        value="favorites"
                                        icon={<FavoriteIcon/>}
                                        sx={{ color: '#191920', fontWeight: 'bold' }}
                                    />
                                    <BottomNavigationAction
                                        label="ADD"
                                        value="favorites"
                                        icon={<FavoriteIcon/>}
                                        sx={{ color: '#191920', fontWeight: 'bold' }}
                                    />  <BottomNavigationAction
                                    label="favorites"
                                    value="favorites"
                                    icon={<FavoriteIcon/>}
                                    sx={{ color: '#191920', fontWeight: 'bold' }}
                                />

                                </BottomNavigation>

                            </Grid>

                        </Grid>
                        <Box sx={{flexGrow: 1}}/>


                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </Box>
                    </Grid>
                </Toolbar>

            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}