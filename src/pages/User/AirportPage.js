import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Collapse, Grid, IconButton, MenuItem, Popover, Stack, Typography} from "@mui/material";
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
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import AddAirportForm from "../../components/Forms/AddAirportForm";
import EditAirportForm from "../../components/Forms/EditAirportForm";

const columns = [
    {id: 'id', label: 'ID', minWidth: 50, align: "center"},
    {id: 'name', label: 'Name', minWidth: 150},
    {id: 'code', label: 'Code', minWidth: 50},
    {id: 'city', label: 'City', minWidth: 100},
    {id: 'country', label: 'Country', minWidth: 100},
    {id: '', label: 'Action', minWidth: 40, align: "right"},
];

export default function AirportPage() {
    const theme = useTheme()
    const [airports, setAirports] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentAircraft, setCurrentAircraft] = useState(0);
    const [openFailedDelete, setOpenFailedDelete] = useState(false);

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
    const updateAirports = () => {
        customAPIv1().get("/airports")
            .then(res => {
                console.log("airports:", res.data);
                setAirports(res.data.data);
            })
            .catch(e => console.log("error in get airports:", e))
    }
    useEffect(() => {
        console.log("form did mount");
        updateAirports();
    }, [])
    return (
        <>
            <Helmet>
                <title> Airport Management | Flight </title>
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
                            Airports
                        </Typography>
                        <Button variant="contained" startIcon={<AddIcon fontSize="small"/>}
                                onClick={handleClickOpenDialog}>
                            New Airport
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
                                                    color: theme.palette.primary.contrastText
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {airports.map((row, index) => {
                                        const {id, name, code, city, country} = row;

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
                                                    <Typography variant="subtitle3">
                                                        {code}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {city}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {country}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(e) => {
                                                        setCurrentAircraft(id)
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
                                Edit
                            </MenuItem>

                            <MenuItem sx={{color: 'error.main'}} onClick={(e) => {
                                handleCloseMenu()
                                handleClickOpenConfirm()
                            }}>
                                <DeleteOutlineIcon fontSize="small"/>
                                Delete
                            </MenuItem>
                        </Popover>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth="md">
                <DialogTitle>Add New Airport</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <AddAirportForm updateAircraft={updateAirports}></AddAirportForm>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth="md">
                <DialogTitle>Edit Airport</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit name
                    </DialogContentText>
                    <EditAirportForm currentUser={currentAircraft} updateUsers={updateAirports}></EditAirportForm>
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
                    {"Are you sure to delete this airport?"}
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
                        customAPIv1().delete(`/airports/${currentAircraft}`)
                            .then(res => {
                                updateAirports()
                                handleCloseConfirm()
                            })
                            .catch(e => {
                                console.log("error in delete:", e);
                                setOpenFailedDelete(true);
                            })
                    }} autoFocus variant="contained" color="error">
                        Remove Airport
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
