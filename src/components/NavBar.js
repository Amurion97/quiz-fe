// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Avatar, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography} from '@mui/material';
import Logo from "./logo";
import {useState} from "react";
import DraftsIcon from '@mui/icons-material/Drafts';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';

// components

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
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
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
                            <Grid item xs={9}>
                                Paperrrrrrrr
                            </Grid>
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
                                    navigate("/dashboard/search")
                                }}
                            >
                                <ListItemIcon>
                                    <DraftsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Search" style={{color: theme.palette.text.primary}}/>
                            </StyledListItemButton>
                        </List>
                    </Box>
                </div>
                {/*</div>*/}
            </StyledRoot>
        </>
    )
        ;
}
