import {useState} from 'react';
import {Outlet} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Grid} from "@mui/material";
import BookingBar from "../components/BookingBar";
import NavBar from "../components/NavBar";
//
// import Header from './header';
// import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const Main = styled('div')(({theme}) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    return (
        <StyledRoot>
            {/*<Header onOpenNav={() => setOpen(true)} />*/}

            {/*<Nav openNav={open} onCloseNav={() => setOpen(false)} />*/}
            <Grid container spacing={0} columns={{xs: 4, sm: 5, md: 6, lg:7}}>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <NavBar/>
                </Grid>
                <Grid item xs={3} sm={4} md={5} lg={6}>
                    <Main>
                        <Outlet/>
                    </Main>
                </Grid>

            </Grid>

        </StyledRoot>
    );
}
