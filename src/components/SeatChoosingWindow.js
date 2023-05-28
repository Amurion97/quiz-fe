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

export default function SeatChoosingWindow(props) {
    console.log("props:", props)
    const theme = useTheme();
    const [flightDetails, setFlightDetails] = useState(null);
    let maxSeatInARow = 1;
    if (flightDetails) {
        maxSeatInARow = flightDetails.rows.reduce((max, row) => (max > row.seats.length) ? max : row.seats.length);
        console.log("maxSeatInARow:", maxSeatInARow)
    }
    let customStyleForPlane = {
        '.plane': {
            maxWidth: `${50 * (maxSeatInARow + 1)}px`
        },
        '.seat': {
            flex: `0 0 ${100 / ++maxSeatInARow}%`,
        },

        [`.seat:nth-child(${Math.floor(maxSeatInARow / 2)})`]: {
            // [`.seat:nth-child(3)`]: {
            marginRight: `${100 / ++maxSeatInARow}%`,
        },
        color: theme.palette.primary.main
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
        <>
            <Dialog
                open={!!props.flight}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Choose your favorite seats"}
                </DialogTitle>
                <DialogContent sx={customStyleForPlane}>
                    {!flightDetails ?
                        <CircularProgress color="primary" style={{
                            position: "absolute",
                            left: "40%",
                            transform: "translateX(-50%)"
                        }}/>
                        :
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8} md={8}>
                                <div className="plane">
                                    <div className="cockpit">
                                        <h1>{flightDetails.from.city} <br/>to<br/> {flightDetails.to.city}<br/>Seat Selection</h1>
                                    </div>
                                    <div className="exit exit--front fuselage">
                                    </div>
                                    <ol className="cabin fuselage">
                                        {flightDetails.rows.map(row => (
                                            <li key={row.id} className={`row row--${row.id}`}>
                                                <ol className="seats" type={row.name}>
                                                    {
                                                        row.seats.map(seat => {
                                                            let name = `${row.name}${seat.no}`
                                                            return (
                                                                <li key={seat.id} className="seat">
                                                                    <input
                                                                        type="checkbox" {...(!seat.isAvailable && {disabled: true})}
                                                                        {...((chosenSeats.findIndex(item => item.id === seat.id) >= 0) && {checked: true})}
                                                                        id={name} onChange={() => {
                                                                        handleCheck({
                                                                            id: seat.id,
                                                                            price: row.price,
                                                                            name: name
                                                                        })
                                                                    }}/>
                                                                    <label htmlFor={name}>{name}</label>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ol>
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="exit exit--back fuselage">

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                Choosen Seats:
                                <List>
                                    {chosenSeats.map(item => (
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" onClick={() => {
                                                    handleCheck(item)
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{bgcolor: theme.palette.primary.light}}>{item.name}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.price}
                                                // secondary={secondary ? 'Secondary text' : null}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                Total:
                                <List>
                                    <ListItem
                                        secondaryAction={
                                            "VND"
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar><FunctionsIcon/></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={chosenSeats.reduce(function (sum, item) {
                                                return sum + item.price
                                            }, 0)}
                                            // secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                </List>

                            </Grid>
                        </Grid>

                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                    <Button onClick={props.handleClose} autoFocus>
                        Finish
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
