// @mui
import {styled, useTheme} from '@mui/material/styles';
import {
    Avatar,
    Button, CircularProgress, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText,
    Paper,
} from '@mui/material';
import {useEffect, useState} from "react";
import {customAPIv1} from "../features/customAPI";
import DeleteIcon from '@mui/icons-material/Delete';
import FunctionsIcon from '@mui/icons-material/Functions';
import {useDispatch} from "react-redux";
import {setDepartureSeats} from "../features/seat/SeatSlice";
import {useNavigate} from "react-router-dom";
// components

// sections
const StyledRoot = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
}));
// ----------------------------------------------------------------------

export default function SeatChoosingWindow(props) {
    console.log("props:", props)
    const navigate = useNavigate();
    const theme = useTheme();
    console.log("theme in Seat Chossing:", theme)
    const dispatch = useDispatch()
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
                <DialogTitle id="alert-dialog-title" style={{color: theme.palette.primary.main}}>
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
                                        <h1>{flightDetails.from.city} <br/>to<br/> {flightDetails.to.city}<br/>Seat
                                            Selection</h1>
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
                                                                            name: name,
                                                                            class: row.class.name
                                                                        })
                                                                    }}/>
                                                                    <label className='noselect'
                                                                           htmlFor={name}>{name}</label>
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
                                                primary={item.price.toLocaleString("de-DE")}
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
                                            }, 0).toLocaleString("de-DE")}
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
                    <Button onClick={() => {
                        console.log("trying to dispatch")
                        dispatch(setDepartureSeats({
                            flight: flightDetails,
                            seats: chosenSeats
                        }))
                        navigate("/finalize");
                    }} autoFocus>
                        Finish
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
