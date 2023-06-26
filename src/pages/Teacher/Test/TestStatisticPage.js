import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Grid,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material/styles";
import { customAPIv1 } from "../../../features/customAPI";

import ProgressBar from "@ramonak/react-progress-bar";
import { useLocation } from "react-router-dom";

const columns = [
    { id: "rank", label: "Rank", minWidth: 50, align: "center" },
    { id: "email", label: "Email", minWidth: 150 },
    { id: "score", label: "Score", minWidth: 200, align: "center" },
    { id: "date", label: "Date taken", minWidth: 100, align: "center" },
];

export default function TestStatisticPage() {
    const theme = useTheme();

    const location = useLocation();
    // console.log("location in test taking:", location)
    const { state } = location;
    let id;
    if (state) {
        ({ id } = state);
    }

    const [attempts, setAttempts] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentTag, setCurrentTag] = useState(0);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
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
        setOpen(false);
    };
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const updateAttempts = () => {
        customAPIv1()
            .get(`/attempts/test/${id}`)
            .then((res) => {
                console.log("attempts of test:", res.data);
                setAttempts(res.data.data);
            })
            .catch((e) => console.log("error in get attempts:", e));
    };
    useEffect(() => {
        console.log("attempts page did mount");
        updateAttempts();
    }, []);
    return (
        <>
            <Helmet>
                <title> Tag Management | Quiz </title>
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
                    backgroundImage:
                        'url("/assets/images/background-test-statistics.png")',
                    backgroundSize: "cover",
                }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        textAlign: "center",
                        color: theme.palette.primary.contrastText,
                        background: "rgba(64, 64, 64, 0.85)",
                        borderRadius: "5px",
                    }}>
                    <Typography variant="titleInTheBackground">
                        Test statistics
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper padding={2} sx={{ bgcolor: "transparent" }}>
                        <TableContainer
                            component={Paper}
                            sx={{ maxHeight: "70vh", bgcolor: "transparent" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    background:
                                                        "rgba(64, 64, 64, 0.85)",
                                                    color: theme.palette.primary
                                                        .contrastText,
                                                }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attempts.map((row, index) => {
                                        const { id, user, finish, score } = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                style={{
                                                    backgroundColor:
                                                        "rgba(89,89,89, 0.85)",
                                                }}>
                                                <TableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
                                                    }}>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                    style={{
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
                                                    }}>
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={2}
                                                        pl={2}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            noWrap>
                                                            {user.email}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none">
                                                    <ProgressBar
                                                        bgColor="#4ED190                                                        "
                                                        baseBgColor="#EA456E"
                                                        height="16px"
                                                        completed={score}
                                                        borderRadius="5px"
                                                    />
                                                </TableCell>

                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
                                                    }}>
                                                    {/*{Date.now().toString()}*/}
                                                    {finish}
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
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            PaperProps={{
                                sx: {
                                    p: 1,
                                    width: 140,
                                    "& .MuiMenuItem-root": {
                                        px: 1,
                                        typography: "body2",
                                        borderRadius: 0.75,
                                    },
                                },
                            }}>
                            <MenuItem
                                sx={{ color: "error.main" }}
                                onClick={(e) => {
                                    handleCloseMenu();
                                    handleClickOpenConfirm();
                                }}>
                                <DeleteOutlineIcon fontSize="small" />
                                Delete
                            </MenuItem>
                        </Popover>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
