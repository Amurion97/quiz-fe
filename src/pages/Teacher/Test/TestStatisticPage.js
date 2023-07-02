import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Backdrop,
    Box, CircularProgress, Collapse,
    Grid, IconButton,
    Input,
    Stack,
    Typography,
} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
//react
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
//conponents
import {customAPIv1} from "../../../features/customAPI";
//sockets
import {socket} from "../../../app/socket";
import {selectUser} from "../../../features/user/userSlice";

import CloseIcon from "@mui/icons-material/Close";


export default function TestStatisticPage() {
    const [isMobileSize, setIsMobileSize] = useState(true);
    const columns = isMobileSize ? [
        {id: "rank", label: "Rank", minWidth: 50, align: "center"},
        {id: "email", label: "Email", minWidth: 100, maxWidth: 100},
        {id: "", label: "", minWidth: 180, align: "center"},
        {id: "score", label: "Score", minWidth: 100, align: "center"},
        {id: "action", label: "Action", minWidth: 50, maxWidth: 50, align: "center"},
    ] : [
        {id: "rank", label: "Rank", minWidth: 50, maxWidth: 60, align: "center"},
        {id: "email", label: "Email", maxWidth: 100},
        {id: "score", label: "Score", minWidth: 50, align: "center"},
        {id: "action", label: "Action", minWidth: 50, maxWidth: 50, align: "center"},
    ];
    const theme = useTheme();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search);
    const roomCode = searchParams.get("code");
    const testId = searchParams.get("test");
    console.log("roomCode:", roomCode);

    const location = useLocation()
    const {state} = location

    const [peopleList, setPeopleList] = useState(state.peopleList)
    console.log("peopleList:", peopleList);

    const [totalQuestion, setTotalQuestion] = useState(0);

    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleOpenBackrop = () => {
        setOpenBackdrop(true);
    };

    const handleKickStudent = (email) => {
        socket.emit('kick-out',
            {roomCode: roomCode, email: user.info.email, targetEmail: email},
            (res) => {
                console.log("kick-out:", res);
                setPeopleList((list) => list.filter(item => item.email !== email))
            })
    }

    useEffect(() => {
        socket.connect();

        customAPIv1()
            .get(`/tests/brief/${testId}`)
            .then((res) => {
                console.log('get test detail:', res.data)
                setTotalQuestion(res.data.data.details.length);
            });

        function onConnect() {
            socket.emit('join-room',
                {roomCode: roomCode, email: user.info.email},
                (res) => {
                    console.log('join-room', res);
                    // if (res.success !== false) {
                    //     res.sort((a, b) => (b.corrects == a.corrects) ?
                    //         (b.corrects + b.incorrects - a.corrects - a.incorrects)
                    //         : (b.corrects - a.corrects));
                    //     setPeopleList(res);
                    // }
                })
        }

        socket.on('connect', onConnect);


        return () => {
            socket.off('connect', onConnect);
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        function onRoomUpdate(arg) {
            console.log('room-update:', arg);
            console.log(arg.email,)
            console.log("peopleList:", peopleList)
            let personIndex = peopleList.findIndex((item, index) => {
                console.log("index:", index, item.email)
                return item.email == arg.email
            });
            console.log('personIndex:', personIndex)
            peopleList[personIndex].corrects = arg.corrects;
            peopleList[personIndex].incorrects = arg.incorrects;
            peopleList.sort((a, b) => (b.corrects == a.corrects) ?
                (b.corrects + b.incorrects - a.corrects - a.incorrects)
                : (b.corrects - a.corrects));
            setPeopleList([...peopleList]);

        }

        socket.on('room-update', onRoomUpdate);

        return () => {
            socket.off('room-update', onRoomUpdate);
        }
    }, [peopleList])


    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            console.log("windowWidth:", windowWidth)

            if (windowWidth <= 600) {
                setIsMobileSize(false);
            } else {
                setIsMobileSize(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title> Group Test Statistic | Quiz </title>
            </Helmet>
            <Stack
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                sx={{
                    height: "100vh",
                    padding: {xs: "1% 1%", md: "4% 4%"},
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
                        px: 2,
                    }}>
                    <Typography variant="titleInTheBackground">
                        Group Test statistics
                    </Typography>
                </Grid>

                <Grid
                    item xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        sx={{
                            boxShadow: `5px 5px ${alpha('#595959', 0.4)}`,
                            p: 5,
                            border: '2px solid'
                        }}
                        variant="outlined"
                        size='large'
                        onClick={handleClickOpenConfirm}
                        color={'error'}

                    >
                        <Typography variant='h3'>
                            STOP
                        </Typography>
                    </Button>
                </Grid>

                {/*<Grid item xs={12}>*/}
                <Paper padding={2} sx={{
                    bgcolor: "transparent",
                    px: {
                        xs: 0
                    },
                    width: '100%'
                }}>
                    <TableContainer
                        component={Paper}
                        sx={{maxHeight: "70vh", bgcolor: "transparent"}}>
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
                                                maxWidth: column.maxWidth,
                                            }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {peopleList.map((row, index) => {
                                    const {id, email, corrects, incorrects} = row;
                                    let sumQuestions = corrects + incorrects;

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
                                                // className="email-cell"
                                                style={{
                                                    color: theme.palette
                                                        .primary
                                                        .contrastText,
                                                }}>
                                                {/*<Stack*/}
                                                {/*    direction="row"*/}
                                                {/*    alignItems="center"*/}
                                                {/*    spacing={2}*/}
                                                {/*    pl={2}>*/}
                                                {/*    <Typography*/}
                                                {/*        variant="subtitle2"*/}
                                                {/*        sx={{*/}
                                                {/*            textOverflow: 'ellipsis',*/}
                                                {/*            overflow: 'hidden',*/}
                                                {/*            whiteSpace: 'nowrap',*/}
                                                {/*            maxWidth: '35vw',*/}
                                                {/*        }}*/}
                                                {/*        noWrap>*/}
                                                {/*        {email}*/}
                                                {/*    </Typography>*/}
                                                {/*</Stack>*/}

                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        maxWidth: {xs: '35vw', sm: '30vw', md: '30vw'},
                                                    }}
                                                    noWrap>
                                                    {email}
                                                </Typography>
                                            </TableCell>

                                            {isMobileSize && (<TableCell
                                                component="th"
                                                scope="row"
                                                padding="none">

                                                <Box
                                                    sx={{
                                                        height: "2vh",
                                                        width: "100%",
                                                        mt: 3,
                                                    }}>
                                                    <Grid
                                                        container
                                                        spacing={1}
                                                        sx={{height: "100%"}}
                                                    >
                                                        {[...Array(totalQuestion)].map(
                                                            (item, index) => (

                                                                <Grid
                                                                    xs={12 / totalQuestion}
                                                                    sx={{pl: 0.2}}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            bgcolor: (theme) =>
                                                                                index < sumQuestions ?
                                                                                    (index < corrects
                                                                                        ? theme.palette.success.main
                                                                                        : theme.palette.error.main)
                                                                                    :
                                                                                    theme.palette.grey[500],
                                                                            height: "100%",
                                                                            // borderRadius: 0.5,
                                                                            borderRadius: '2.5px',
                                                                        }}
                                                                    />
                                                                </Grid>

                                                            )
                                                        )}
                                                    </Grid>
                                                </Box>

                                            </TableCell>)}

                                            <TableCell
                                                align="center"
                                                style={{
                                                    color: theme.palette
                                                        .primary
                                                        .contrastText,
                                                }}>
                                                {corrects}/{sumQuestions}
                                            </TableCell>

                                            <TableCell align="center">
                                                <IconButton aria-label="settings"
                                                            onClick={() => {
                                                                handleKickStudent(email)
                                                            }}
                                                            color={'error'}
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>
                {/*</Grid>*/}

            </Stack>


            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn chắc chắn muốn dừng bài thi?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Kết thúc bài thi sẽ lưu lại toàn bộ kết quả bài thi tính đến hiện tại,
                        bạn có chắc muốn dừng bài thi không?
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Không</Button>
                    <Button onClick={() => {
                        handleCloseConfirm()
                        setOpenBackdrop(true);

                        socket.emit('stop-test', {roomCode: roomCode, email: user.info.email}, (res) => {
                            console.log('stop-test', res);

                            if (res.success === true) {
                                handleCloseBackdrop();
                                navigate('/');
                            }

                        })
                    }} autoFocus variant="contained" color="error">
                        Dừng bài thi
                    </Button>
                </DialogActions>
            </Dialog>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackdrop}
                // onClick={handleCloseBackdrop}
            >
                <CircularProgress color="primary"/>
            </Backdrop>
        </>
    );
}
