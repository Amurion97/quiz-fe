// @mui
import {styled} from '@mui/material/styles';
import {Grid, Container, Slide} from '@mui/material';
import BookingBar from "../../components/BookingBar";
import FlightList from "../../components/FlightList";
import {useState} from "react";
import SeatChoosingWindow from "../../components/SeatChoosingWindow";
// components

// sections
const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: theme.palette.background.default,
}));
// ----------------------------------------------------------------------

export default function ResultsPage() {
    const [flightToChooseSeat, setFlightToChooseSeat] = useState(null);

    const handleClickOpen = (id) => {
        setFlightToChooseSeat(id);
    };

    const handleClose = () => {
        setFlightToChooseSeat(null);
    };
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
