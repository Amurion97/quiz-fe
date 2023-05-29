// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Grid, Container, Paper, Typography, Button, Slide} from '@mui/material';
import {useSearchParams} from "react-router-dom";
import BookingBar from "../components/BookingBar";
import FlightList from "../components/FlightList";
import {useState} from "react";
import SeatChoosingWindow from "../components/SeatChoosingWindow";
// components

// sections
const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: theme.palette.background.default,
}));
const Flight = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

export default function FlightPage() {
    const [flightToChooseSeat, setFlightToChooseSeat] = useState(null);

    const handleClickOpen = (id) => {
        setFlightToChooseSeat(id);
    };

    const handleClose = () => {
        setFlightToChooseSeat(null);
    };
    const theme = useTheme();
    return (
        <>
            <StyledRoot>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Container maxWidth="lg" style={{
                        padding: "15px 25px 25px"
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12}>
                                <BookingBar/>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container spacing={3} alignItems="center">

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FlightList handleClickOpen={handleClickOpen}></FlightList>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        <SeatChoosingWindow flight={flightToChooseSeat} handleClickOpen={handleClickOpen}
                                            handleClose={handleClose}/>
                    </Container>
                </Slide>
            </StyledRoot>
        </>
    );
}
