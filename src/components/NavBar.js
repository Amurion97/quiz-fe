import {useNavigate} from "react-router-dom";
import {useState} from "react";
// redux
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../features/user/userSlice";
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {
    Avatar, Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@mui/material';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EditRoadIcon from '@mui/icons-material/EditRoad';
// components
import Logo from "./logo";
import {Search} from "./Forms/NewNavbarComponent/Search";
import {InputBase} from "formik-mui";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';


// sections
const StyledRoot = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    borderRight: "2px dotted lightgrey",
    borderRadius: 0,
    // height: "100%",
}));

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const UserInfoBox = styled(Paper)(({theme}) => ({
    // backgroundColor: theme.palette.grey[400],
    backgroundColor: theme.palette.secondary.light,
    textAlign: 'center',
    color: theme.palette.text.primary,
    padding: "5%",
    // height: 60,
    height: "70%",
    // lineHeight: '100%',
    // lineHeight: '60px',
}));
const StyledListItemButton = styled(ListItemButton)(({theme}) => ({
    borderRadius: "10px",
    '&.active': {
        color: 'text.primary',
        bgcolor: 'action.selected',
        fontWeight: 'fontWeightBold',
    },

}));
// ----------------------------------------------------------------------

export default function NavBar(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () => {

        console.log(searchValue);
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>

            <StyledRoot className="navbar-wrapper">
                {/*<div className="navbar-wrapper">*/}
                <div className="navbar-item1">
                    <Logo
                        sx={{
                            position: 'fixed',
                            top: {xs: 16, sm: 24, md: 40},
                            left: {xs: 16, sm: 24, md: 40},
                        }}
                    />
                </div>
                <div className="navbar-item2">
                    <UserInfoBox>
                        <Grid container spacing={0} justifyContent="center" direction="row"
                              alignItems="center"
                              style={{
                                  height: "100%"
                              }}>
                            <Grid item xs={3}>
                                <Avatar src='/assets/images/avatars/avatar_default.jpg' alt="photoURL"/>
                            </Grid>
                            <Grid item xs={6}>
                                {user.info.username}
                                <IconButton size="large" color="inherit" onClick={handleClick}>
                                    <MoreVertIcon fontSize="small"/>
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={() => {

                                    }
                                    }>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={() => {
                                        dispatch(logout());
                                        navigate("/login");
                                    }}>Logout</MenuItem>
                                </Menu>

                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>


                    </UserInfoBox>

                </div>
                <div className="navbar-item3">
                    <Box sx={{width: '100%', maxWidth: 360}}>
                        <List component="nav" aria-label="main mailbox folders">

                            <StyledListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => {
                                    handleListItemClick(event, 0)
                                    navigate("/dashboard/createFlight")
                                }}
                            >
                                <ListItemIcon>
                                    <AddBoxIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Create A Flight" style={{color: theme.palette.text.primary}}/>
                            </StyledListItemButton>


                            <StyledListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => {
                                    handleListItemClick(event, 1)
                                    navigate("/dashboard/flights")
                                }}
                            >
                                <ListItemIcon>
                                    <FlightTakeoffIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Flights" style={{color: theme.palette.text.primary}}/>
                            </StyledListItemButton>

                            <StyledListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => {
                                    handleListItemClick(event, 2)
                                    navigate("/dashboard/aircraft")
                                }}
                            >
                                <ListItemIcon>
                                    <AirplanemodeActiveIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Aircraft" style={{color: theme.palette.text.primary}}/>
                            </StyledListItemButton>

                            {(user.info.role == 1) && (
                                <>
                                    <Divider/>
                                    <StyledListItemButton
                                        selected={selectedIndex === 3}
                                        onClick={(event) => {
                                            handleListItemClick(event, 3)
                                            navigate("/dashboard/users")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SupervisedUserCircleIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Users" style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>

                                    <StyledListItemButton
                                        selected={selectedIndex === 4}
                                        onClick={(event) => {
                                            handleListItemClick(event, 4)
                                            navigate("/dashboard/airports")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <EditRoadIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Airports" style={{color: theme.palette.text.primary}}/>
                                    </StyledListItemButton>
                                </>)}
                        </List>
                    </Box>
                </div>
                {/*</div>*/}
            </StyledRoot>
        </>
    )
        ;
}
