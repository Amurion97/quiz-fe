import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Grid, IconButton, MenuItem, Popover, Stack, Typography} from "@mui/material";
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
import axios from "axios";
import {useNavigate} from "react-router-dom";

const columns = [
    {id: 'id', label: 'ID', minWidth: 50, align: "center"},
    {id: 'title', label: 'Title', minWidth: 150},
    {id: 'price', label: 'Price', minWidth: 100},
    {id: 'description', label: 'Description', minWidth: 150},
    {id: '', label: 'Action', minWidth: 40, align: "right"},
];

export default function PhonePage() {
    const theme = useTheme()
    const navigate = useNavigate()
    const [phones, setPhones] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentPhone, setCurrentPhone] = useState(0);

    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const updatePhones = () => {
        axios.get("http://127.0.0.1:3001/products")
            .then(res => {
                console.log("phones:", res.data);
                setPhones(res.data);
            })
            .catch(e => console.log("error in get phones:", e))
    }
    useEffect(() => {
        console.log("form did mount");
        updatePhones();
    }, [])
    return (
        <>
            <Helmet>
                <title> Phone Management </title>
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
                            Phone
                        </Typography>
                        <Button variant="contained" startIcon={<AddIcon fontSize="small"/>}
                                onClick={() => {
                                    navigate("/test/add")
                                }}>
                            New Phone
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
                                    {phones.map((row, index) => {
                                        const {id, title, description, price} = row;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                                <TableCell align="center" component="th" scope="row">
                                                    {id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2} pl={2}>
                                                        <Typography variant="subtitle2" noWrap
                                                                    sx={{textDecoration: 'underline'}}
                                                                    onClick={() => {
                                                                        navigate("/test/detail", {
                                                                            state: {
                                                                                productID: id
                                                                            }
                                                                        })
                                                                    }}
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3" noWrap>
                                                        {price}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Typography variant="subtitle3">
                                                        {description}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={(e) => {
                                                        setCurrentPhone(id)
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
                                navigate("/test/edit", {
                                    state: {
                                        productID: currentPhone
                                    }
                                })
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


            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this phone?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button onClick={() => {
                        axios.delete(`http://127.0.0.1:3001/products/${currentPhone}`)
                            .then(res => {
                                updatePhones()
                                handleCloseConfirm()
                            })
                            .catch(e => {
                                console.log("error in delete:", e)
                            })
                    }} autoFocus variant="contained" color="error">
                        Remove Phone
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
