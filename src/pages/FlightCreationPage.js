import {Helmet} from 'react-helmet-async';
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Container, Grid, Typography} from '@mui/material';
// hooks
// components
import Logo from '../components/logo';
// sections
import FlightCreateForm from "../components/Forms/FlightCreateForm";

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: "url(/assets/images/background.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%"
}));

const StyledContent = styled('div')(({theme}) => ({
    // background: "transparent",
    maxHeight: "70%",
    margin: 'auto',
    // minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: "60%",
    flexDirection: 'row',
    padding: theme.spacing(12, 0),
    // backgroundColor: '#f9fafb',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)"
}));

// ----------------------------------------------------------------------

export default function FlightCreationPage() {
    const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Flight Creation | Minimal UI </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    height: "100%",
                    padding: "5%"
                }}
            >
                <Grid item xs={12}>
                    <FlightCreateForm/>
                </Grid>
            </Grid>
        </>
    )
}
