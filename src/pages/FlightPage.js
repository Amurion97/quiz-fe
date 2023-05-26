// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Grid, Container, Paper, Typography, Button} from '@mui/material';
import {useSearchParams} from "react-router-dom";
import BookingBar from "../components/BookingBar";
import FlightList from "../components/FlightList";
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
    const theme = useTheme();
    return (
        <>
            <StyledRoot>
                <Container maxWidth="lg" style={{
                    padding: "15px 25px 25px"
                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12}>
                            <BookingBar>
                            </BookingBar>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant="body1" gutterBottom color={theme.palette.primary.main}>
                                        ... results
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} >
                                    <FlightList></FlightList>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StyledRoot>
        </>
    );
}
