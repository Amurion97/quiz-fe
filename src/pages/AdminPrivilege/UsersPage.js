//React
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
//@mui
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Avatar,
    Button,
    Chip,
    Grid,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useTheme} from "@mui/material/styles";
//MUI Icon
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
//component
import AddUserForm from "../../components/Forms/AddUserForm";
import EditUserForm from "../../components/Forms/EditUserForm";
//API
import {customAPIv1} from "../../features/customAPI";


const columns = [
    {id: "name", label: "Name", minWidth: 150},
    {id: "role", label: "Role", minWidth: 150},
    {id: "email", label: "Email", minWidth: 250},
    {id: "isLocked", label: "Status", minWidth: 150, align: "center"},
    {id: "", label: "Action", minWidth: 40, align: "right"},
];

export default function UsersPage() {
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentUser, setCurrentUser] = useState(0);
    const [currentUserRole, setCurrentUserRole] = useState(3);

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

    const [openUpgradeConfirm, setOpenUpgradeConfirm] = useState(false);

    const handleClickOpenUpgradeConfirm = () => {
        setOpenUpgradeConfirm(true);
    };

    const handleCloseUpgradeConfirm = () => {
        setOpenUpgradeConfirm(false);
    };
    const updateUsers = () => {
        customAPIv1()
            .get("/users")
            .then((res) => {
                console.log("users:", res.data);
                setUsers(res.data.data);
            })
            .catch((e) => console.log("error in get users:", e));
    };
    useEffect(() => {
        console.log("form did mount");
        updateUsers();
    }, []);
    return (
        <>
            <Helmet>
                <title> User Management | Quiz </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: "100vh",
                    padding: "5% 10%",
                    overFlow: "scroll",
                }}>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}>
                        <Typography variant="h4" gutterBottom>
                            User
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon fontSize="small"/>}
                            onClick={handleClickOpenDialog}>
                            New User
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Paper padding={2}>
                        <TableContainer component={Paper} sx={{maxHeight: "70vh"}}>
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
                                                }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {users.map((row, index) => {
                                        const {
                                            id,
                                            name,
                                            role,
                                            email,
                                            isLocked,
                                        } = row;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={2}
                                                        pl={2}>
                                                        <Avatar
                                                            alt={name}
                                                            src={`/assets/images/avatars/avatar_${
                                                                (index % 24) + 1
                                                            }.jpg`}
                                                        />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Chip label={role.name}
                                                          color={role.id === 1 ?
                                                              'warning'
                                                              :
                                                              (role.id === 2 ? 'primary' : 'secondary')}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="center">
                                                    {isLocked ? (
                                                        <Chip label="Locked" color="error"/>
                                                    ) : (
                                                        <Chip label="Active" color="success"/>
                                                    )}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <IconButton
                                                        size="large"
                                                        color="inherit"
                                                        onClick={(e) => {
                                                            setCurrentUser(id);
                                                            setCurrentUserRole(role.id);
                                                            handleOpenMenu(e);
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
                            anchorOrigin={{vertical: "top", horizontal: "left"}}
                            transformOrigin={{vertical: "top", horizontal: "right"}}
                            PaperProps={{
                                sx: {
                                    p: 1,
                                    width: 200,
                                    "& .MuiMenuItem-root": {
                                        px: 1,
                                        typography: "body2",
                                        borderRadius: 0.75,
                                    },
                                },
                            }}>
                            {currentUserRole === 3 && (
                                <>
                                    <MenuItem
                                        sx={{color: "blue"}}
                                        onClick={(e) => {
                                            handleCloseMenu();
                                            handleClickOpenUpgradeConfirm();
                                        }}>
                                        <UpgradeRoundedIcon fontSize="small"/>
                                        Upgrade Role
                                    </MenuItem>
                                </>
                            )}
                            <MenuItem
                                onClick={() => {
                                    handleClickOpenEditDialog();
                                    handleCloseMenu();
                                }}>
                                <EditIcon fontSize="small"/>
                                Edit
                            </MenuItem>

                            <MenuItem
                                sx={{color: "error.main"}}
                                onClick={(e) => {
                                    handleCloseMenu();
                                    handleClickOpenConfirm();
                                }}>
                                <DeleteOutlineIcon fontSize="small"/>
                                Delete
                            </MenuItem>
                        </Popover>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth="md">
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter username, field, name</DialogContentText>
                    <AddUserForm updateUsers={updateUsers}></AddUserForm>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>

            <Dialog
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                fullWidth="md">
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit name, username, password</DialogContentText>
                    <EditUserForm
                        currentUser={currentUser}
                        updateUsers={updateUsers}></EditUserForm>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button
                        onClick={() => {
                            customAPIv1()
                                .delete(`/users/${currentUser}`)
                                .then((res) => {
                                    updateUsers();
                                    handleCloseConfirm();
                                })
                                .catch((e) => {
                                    console.log("error in delete:", e);
                                });
                        }}
                        autoFocus
                        variant="contained"
                        color="error">
                        Remove User
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openUpgradeConfirm}
                onClose={handleCloseUpgradeConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to upgrade this user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpgradeConfirm}>Cancel</Button>
                    <Button
                        onClick={() => {
                            console.log('chay onclick role upgrade');
                            customAPIv1()
                                .put(`/users/editRole/${currentUser}`)
                                .then((res) => {
                                    updateUsers();
                                    handleCloseUpgradeConfirm();
                                })
                                .catch((e) => {
                                    console.log("error in upgrade:", e);
                                });
                        }}
                        autoFocus
                        variant="contained">
                        Upgrade Role
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
