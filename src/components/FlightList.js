import axios from "axios";
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Grid, Container, Paper, Typography, Button} from '@mui/material';
import {useNavigate, useSearchParams} from "react-router-dom";
import BookingBar from "../components/BookingBar";
import {useEffect, useState} from "react";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import {useDispatch, useSelector} from "react-redux";
import {selectCount} from "../features/counter/counterSlice";
import {fetchFlights, selectDeparture} from "../features/flight/flightSlice";
// components

// sections
const Flight = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
}));
// const DAY = {
//     0 : "Sunday",
//     1 : "Monday",
//     2 : "Tuesday",
//     3 : "Wednesday",
//     4 : "Thursday",
//     5 : "Friday",
//     6 : "Saturday",
// }
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
// ----------------------------------------------------------------------

export default function FlightList(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    // const [flights, setFlights] = useState([]);
    const flights = useSelector(selectDeparture);
    const [searchParams, setSearchParams] = useSearchParams();
    const count = useSelector(selectDeparture);
    console.log("departure:", count);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("list did mount");
        console.log("search Params:", searchParams)
        // dispatch(fetchFlights({
        //     query: searchParams,
        //     skip: flights.length
        // }))
    }, [])
    return (
        <>
            <Grid container spacing={3} alignItems="center" mb={3}>
                <Grid item xs={6} sm={9} md={9}>
                    <Typography variant="body1" gutterBottom color={theme.palette.primary.main}>
                        {flights.list.length} results
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <Button variant="contained" color="primary" fullWidth
                            onClick={() => {
                                navigate("/search")
                            }
                            }>
                        Change your search
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={3} alignItems="center">
                {flights.list.map(item => {
                    // console.log("item:", item.id);
                    let start = new Date(item.start);
                    let end = new Date(item.end);
                    // let duration = new Date(end - start);
                    let duration = end - start;
                    // let hours = (duration.getFullYear() * 365 + duration.getMonth() * 30 + duration.getDate()) * 24 + duration.getHours();
                    let minutes = Math.round(duration / (1000 * 60));
                    let hours = Math.floor(minutes / 60);
                    minutes -= hours * 60
                    // console.log("duration:", duration)
                    // console.log("hours:", hours, "minutes:", minutes)
                    return (
                        <Grid key={item.id} item xs={12} sm={12} md={12}>
                            <Flight>
                                <Grid container spacing={3} alignItems="center" padding={1}>
                                    <Grid item xs={3} sm={3} md={3} align='left'>
                                        <Typography variant="h5" gutterBottom
                                                    my={2}>
                                            {(start.getHours() > 12) ? start.getHours() - 12 : start.getHours()}:{start.getMinutes()} {(start.getHours() >= 12) ? "PM" : "AM"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom
                                                    sx={{fontWeight: 'bold'}}>
                                            {item.from.city} <FlightTakeoffIcon></FlightTakeoffIcon>
                                        </Typography>
                                        <Typography variant="body1" gutterBottom
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        fontWeight: 'light'
                                                    }}>
                                            {/*{DAY[start.getDay()]}, Apr 21, 2020*/}
                                            {start.toLocaleDateString(undefined, options)}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} align='center'>
                                        <Typography variant="body1" gutterBottom
                                                    sx={{
                                                        fontWeight: 'light',
                                                        fontSize: '1em'
                                                    }}>
                                            {hours}hr {minutes}m
                                        </Typography>
                                        <div className="flight-card__route-line route-line" aria-hidden="true">
                                            <div className="route-line__stop route-line__start"
                                                 aria-hidden="true"></div>
                                            <div className="route-line__stop route-line__end"
                                                 aria-hidden="true"></div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} align='right'>
                                        <Typography variant="h5" gutterBottom
                                                    my={2}>
                                            {(end.getHours() > 12) ? end.getHours() - 12 : end.getHours()}:{end.getMinutes()} {(end.getHours() >= 12) ? "PM" : "AM"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom
                                                    sx={{fontWeight: 'bold'}}>
                                            <FlightLandIcon></FlightLandIcon> {item.to.city}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        fontWeight: 'light'
                                                    }}>
                                            {end.toLocaleDateString(undefined, options)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3}>
                                        <Typography variant="h3" gutterBottom
                                                    my={2}>
                                            {/*<sup style={{*/}
                                            {/*    fontSize: "0.6em"*/}
                                            {/*}}>$</sup>*/}
                                            {item.rows[0].price.toLocaleString("de-DE")}
                                            <sub style={{
                                                fontSize: "0.7rem",
                                                fontWeight: "light"
                                            }}>VNĐ</sub>
                                        </Typography>
                                        <Button variant="contained" color="secondary" fullWidth
                                                onClick={() => {
                                                    props.handleClickOpen(item.id)
                                                }
                                                }>
                                            Select
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Flight>
                        </Grid>
                    )
                })}
            </Grid>

        </>
    );
}
