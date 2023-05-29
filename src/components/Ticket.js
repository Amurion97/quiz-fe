// @mui
import {styled, useTheme} from '@mui/material/styles';
import {
    Avatar,
    Button, CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText,
    Paper,
    Typography
} from '@mui/material';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchFlights} from "../features/flight/flightSlice";
import {customAPIv1} from "../features/customAPI";
import BookingBar from "./BookingBar";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {deepPurple, green} from "@mui/material/colors";
import FunctionsIcon from '@mui/icons-material/Functions';
// components

// sections
const StyledRoot = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
}));
const CssDatePicker = styled(DatePicker)(({theme}) => ({
    color: "red",
    '& label.Mui-focused': {
        color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.primary.contrastText,
        height: "2.5rem",
        color: theme.palette.primary.main,
        // '& fieldset': {
        //     borderColor: theme.palette.secondary.main,
        // },
        // '&:hover fieldset': {
        //     borderColor: theme.palette.secondary.main,
        // },
        // '&.Mui-focused fieldset': {
        //     borderColor: theme.palette.secondary.main,
        // },
    },
}));

// ----------------------------------------------------------------------

export default function Ticket(props) {
    console.log("props:", props)
    const theme = useTheme();
    const [flightDetails, setFlightDetails] = useState(null);
    let maxSeatInARow = 1;
    if (flightDetails) {
        maxSeatInARow = flightDetails.rows.reduce((max, row) => (max > row.seats.length) ? max : row.seats.length);
        console.log("maxSeatInARow:", maxSeatInARow)
    }
    console.log("flightDetails:", flightDetails)
    useEffect(() => {
        customAPIv1().get(`flights/${props.flight}`)
            .then(res => {
                console.log("res:", res)
                setFlightDetails(res.data.data);
            })
    }, [props.flight])

    let [chosenSeats, setChosenSeats] = useState([]);
    const handleCheck = (seat) => {
        console.log("chosenSeats:", chosenSeats)
        let index = chosenSeats.findIndex(item => item.id === seat.id);
        if (index < 0) {
            setChosenSeats([...chosenSeats, seat]);
        } else {
            chosenSeats.splice(index, 1);
            setChosenSeats([...chosenSeats])
        }
    }
    return (
        <div className="container-ticket">
            <div className="ticket">
                <div className="ticket-left">
                    <div className="corner-seat-container">
                        <div className="item">seat</div>
                        <div className="lgdetail">25a</div>
                    </div>
                    <div className="airplane-container">
                        <img src="https://assets.codepen.io/1026437/blackAirplane.png" alt="airplane-img"/>
                    </div>
                    <div className="departure-time">
                        <div className="item">departure time</div>
                        <div className="lgdetail">5:19am</div>
                    </div>
                    <div className="departing">
                        <div className="item">departing</div>
                        <div className="smdetail">knoxville(TYS)</div>
                    </div>
                </div>
                <div className="ticket-middle">
                    <div className="passenger-name">
                        <div className="item">passenger</div>
                        <div className="smdetail">smith, john r</div>
                    </div>
                    <div className="gate">
                        <div className="item">gate</div>
                        <div className="lgdetail">***</div>
                    </div>
                    <div className="flight">
                        <div className="item">flight</div>
                        <div className="lgdetail">402rd</div>
                    </div>
                    <div className="destination">
                        <div className="item">destination</div>
                        <div className="smdetail">miami(MIA)</div>
                    </div>
                    <div className="group">
                        <div className="item">class</div>
                        <div className="smdetail">Premium Eco</div>
                    </div>
                    <div className="serial">
                        <div>** **** *** **** </div>
                    </div>
                </div>
                <div className="ticket-right">
                    <div className="stub-flight">
                        <div className="smitem">flight</div>
                        <div className="exsmdetail">402rd</div>
                    </div>
                    <div className="stub-seat">
                        <div className="smitem">seat</div>
                        <div className="exsmdetail">25a</div>
                    </div>
                    <div className="stub-depart">
                        <div className="smitem">depart</div>
                        <div className="exsmdetail">5:19am</div>
                    </div>
                    <div className="stub-passenger">
                        <div className="smitem">passenger</div>
                        <div className="exsmdetail">Smith, John, R</div>
                    </div>
                    <div className="barcode">3859384847</div>
                </div>
            </div>
        </div>
    )
}
