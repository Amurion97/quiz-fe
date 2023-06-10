import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Avatar, Button, Chip, Collapse, Grid, IconButton, MenuItem, Popover, Stack, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import AddIcon from "@mui/icons-material/Add";
import {useTheme} from '@mui/material/styles';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {customAPIv1} from "../../features/customAPI";
import {useNavigate} from "react-router-dom";
import {dayFormatOptions} from "../../components/FlightList";
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EditFlightForm from "../../components/Forms/EditFlightForm";

const columns = [
    {id: 'id', label: 'ID', minWidth: 50, align: "center"},
    {id: 'name', label: 'Name', minWidth: 100},
    {id: 'aircraft', label: 'Aircraft Name', minWidth: 100},
    {id: 'airline', label: 'Airline', minWidth: 100},
    {id: 'from', label: 'From', minWidth: 50, maxWidth: 75},
    {id: 'to', label: 'To', minWidth: 50, maxWidth: 75},
    {id: 'start', label: 'Departure Time', minWidth: 50, maxWidth: 75},
    {id: 'end', label: 'Arrival Time', minWidth: 50, maxWidth: 75},
    {id: 'isCanceled', label: 'Status', minWidth: 100, align: "center"},
    {id: '', label: 'Action', minWidth: 40, align: "right"},
];

export default function FlightPage() {
    const theme = useTheme()
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentFlight, setcurrentFlight] = useState(0);

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const [openFailedDelete, setOpenFailedDelete] = useState(false);

    const updateFlights = () => {
        customAPIv1().get("/flights")
            .then(res => {
                console.log("flights:", res.data);
                setFlights(res.data.data);
            })
            .catch(e => console.log("error in get flights:", e))
    }
    useEffect(() => {
        console.log("form did mount");
        updateFlights();
    }, [])
    return (
        <>
            <Helmet>
                <title> Flight Management | Flight </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: "100vh",
                    padding: "5% 10%",
                    overFlow: "scroll"
                }}
            >
                <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom>
                            Flight
                        </Typography>
                        <Button variant="contained" startIcon={<AddIcon fontSize="small"/>}
                                onClick={() => {
                                    navigate("/dashboard/createFlight")
                                }}>
                            New Flight
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Paper padding={2}>
                        <TableContainer
                            component={Paper}
                            sx={{maxHeight: "70vh"}}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    backgroundColor: theme.palette.primary.dark,
                                                    color: theme.palette.primary.contrastText,
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {flights.map((row, index) => {
                                        const {id, name, aircraft, from, to, isCanceled} = row;
                                        let start = new Date(row.start);
                                        let end = new Date(row.end);

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                                <TableCell align="center" component="th" scope="row">
                                                    {id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2} pl={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3" noWrap>
                                                        {aircraft.name}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Stack direction="column" alignItems="center" spacing={0}>
                                                        <Avatar alt={name}
                                                                src={aircraft.airline.imageURL}/>
                                                        <Typography variant="subtitle3" noWrap>
                                                            {aircraft.airline.name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {from.name} ({from.code})
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {to.name} ({to.code})
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {(start.getHours() > 12) ? start.getHours() - 12 : start.getHours()}:{start.getMinutes()} {(start.getHours() >= 12) ? "PM" : "AM"}
                                                        <br/>
                                                        {start.toLocaleDateString(undefined, dayFormatOptions)}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {(end.getHours() > 12) ? end.getHours() - 12 : end.getHours()}:{end.getMinutes()} {(end.getHours() >= 12) ? "PM" : "AM"}
                                                        <br/>
                                                        {end.toLocaleDateString(undefined, dayFormatOptions)}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    {isCanceled ?
                                                        <Chip label="Canceled" color="error"/>
                                                        :
                                                        <Chip label="OK" color="success"/>}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(e) => {
                                                        setcurrentFlight(id)
                                                        handleOpenMenu(e)
                                                    }}>
                                                        <MoreVertIcon fontSize="small"/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Popover
                            open={Boolean(openMenu)}
                            anchorEl={openMenu}
                            onClose={handleCloseMenu}
                            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                            transformOrigin={{vertical: 'top', horizontal: 'right'}}
                            PaperProps={{
                                sx: {
                                    p: 1,
                                    width: 140,
                                    '& .MuiMenuItem-root': {
                                        px: 1,
                                        typography: 'body2',
                                        borderRadius: 0.75,
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleClickOpenEditDialog()
                                handleCloseMenu()
                            }}>
                                <EditIcon fontSize="small"/>
                                Edit Prices
                            </MenuItem>

                            <MenuItem sx={{color: 'error.main'}} onClick={(e) => {
                                handleCloseMenu()
                                handleClickOpenConfirm()
                            }}>
                                <DeleteOutlineIcon fontSize="small"/>
                                Cancel
                            </MenuItem>
                        </Popover>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth="md">
                <DialogTitle>Edit Flight</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit price of desired rows
                    </DialogContentText>
                    <EditFlightForm currentUser={currentFlight} updateUsers={updateFlights}></EditFlightForm>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={() => {
                    handleCloseConfirm()
                    setOpenFailedDelete(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to cancel this flight?"}
                </DialogTitle>
                <DialogContent>
                    <Collapse in={openFailedDelete}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenFailedDelete(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                            sx={{mb: 2}}
                            variant="filled" severity="error"
                        >
                            Error! Please contact admin for more information!
                        </Alert>
                    </Collapse>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button onClick={() => {
                        customAPIv1().delete(`/flights/${currentFlight}`)
                            .then(res => {
                                updateFlights()
                                handleCloseConfirm()
                            })
                            .catch(e => {
                                console.log("error in delete:", e);
                                setOpenFailedDelete(true);
                            })
                    }} autoFocus variant="contained" color="error">
                        Cancel Flight
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
