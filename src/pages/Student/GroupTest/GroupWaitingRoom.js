import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid, Paper,
    Typography,
    useMediaQuery,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//icon mui
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import {useTheme} from "@mui/material/styles";
// MUI----------------------------------------------------------------

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

// React----------------------------------------------------------------

import StudentsLounge from "../../../components/StudentsLounge";

//Page  ----------------------------------------------------------------

import {socket} from "../../../app/socket";
// Socket----------------------------------------------------------------

// Feature----------------------------------------------------------------
import {selectUser} from "../../../features/user/userSlice";
import {OnStopTestInFormik} from "../../../components/OnStopTestInFormik";

export default function GroupWaitingRoom() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const roomCode = searchParams.get("code");
    console.log("roomCode:", roomCode);

    const user = useSelector(selectUser);
    const location = useLocation();
    console.log("location in student lobby:", location);
    const {state} = location;

    const [peopleList, setPeopleList] = useState(state ? state.peopleList : []);
    const [peopleIndex, setPeopleIndex] = useState("");
    // setPeopleList()
    console.log("peopleList:", peopleList);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [out, setOut] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleCloseOut = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOut(false)
    };


    useEffect(() => {
        localStorage.setItem('isStartingTest', undefined);

        if (!state) {
            socket.connect();
        }

        console.log('this [] effect on student lobby is running')

        function onConnect() {
            socket.emit('join-lobby',
                {roomCode: roomCode, email: user.info.email},
                (res) => {
                    console.log('join-lobby', res);
                    if (res.success !== false) {
                        setPeopleList(res);
                    }

                })
        }


        function onLobbyUpdate(arg) {
            console.log('lobby-update:', arg);
            if (arg.join) {
                setPeopleList((list) => [...list, arg.person])
                setPeopleIndex(arg.person)
                setOpen(true)
            } else if (arg.leave) {
                setPeopleList((list) => list.filter(item => item.email !== arg.email))
                setPeopleIndex(arg.email)
                setOut(true)
            }
        }

        function onStartTest(arg) {
            console.log('start-test:', arg);
            localStorage.setItem('isStartingTest', true);
            navigate('/groupTestTaking', {
                state: {
                    test: arg.test,
                    roomCode: roomCode
                }
            })
        }

        if (!state) {
            socket.on('connect', onConnect);
        }

        socket.on('lobby-update', onLobbyUpdate);
        socket.on('start-test', onStartTest);


        return () => {
            console.log('return for this [] effect on student lobby is running')

            socket.off('connect', onConnect);
            socket.off('lobby-update', onLobbyUpdate);
            socket.off('start-test', onStartTest);

            console.log("isStartingTest:", localStorage.getItem('isStartingTest'));
            if (localStorage.getItem('isStartingTest') !== 'true') {
                console.log("isStartingTest:", localStorage.getItem('isStartingTest'));
                console.log('socket disconnecting')
                socket.disconnect();
            }
        }

    }, [])

    return (
        <>
            <Box
                sx={{
                    p: 3,

                    margin: 'auto',
                    // transform: "scale(1.2)"
                    borderWidth: '0px',
                    [theme.breakpoints.up('md')]: {
                        // backgroundColor: theme.palette.primary.main,
                        maxWidth: '1200px',
                        p: 10,
                    },
                    maxWidth: "100%", // Thêm thuộc tính maxWidth để không bị quá to trên màn hình nhỏ
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} sx={{pr: isMd ? 3 : 0}}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src="/assets/images/avatars/avatar_default.jpg"
                                        alt="photoURL"
                                        sx={{height: "80px", width: "80px"}}
                                    />
                                }
                                title={user.info.email}
                                subheader="Bạn"
                                titleTypographyProps={{
                                    variant: 'h4',
                                    noWrap: true,
                                    maxWidth: {
                                        xs: 'calc(100% - 80px)',
                                        sm: '550px',
                                        md: '330px',
                                        lg: '500px'
                                    },
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 'bold'
                                }}
                                disableTypography={false}
                                subheaderTypographyProps={{
                                    variant: 'h5'
                                }}
                                sx={{
                                    p: {xs: 2, sm: 4, md: 5}
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={1}
                            sx={{
                                py: {xs: 1, sm: 2, md: 3},
                                textAlign: 'center',
                                height: '100%'
                            }}>
                            <Typography
                                variant="h4"
                                color="text.secondary"
                                gutterBottom
                            >
                                JOIN CODE
                            </Typography>
                            <Typography variant="h3" component="div">
                                {roomCode}
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: isMd ? 0 : 1,
                        }}
                    >
                        <Typography variant="h4">
                            Waiting for the host to start....
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{
                        mt: 1
                    }}>
                        <Card
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",


                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    py: 1,

                                }}
                            >
                                <GroupsTwoToneIcon fontSize="large"/>

                                <Typography variant="h4" sx={{ml: "4px"}}>
                                    {peopleList.length}
                                </Typography>

                            </Box>
                        </Card>
                    </Grid>

                </Grid>

            </Box>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" color="primary" sx={{width: '100%'}}>
                    {console.log("peopleIndex", peopleIndex)}
                    {peopleIndex &&
                        <span> Tài khoản {peopleIndex.email} vừa tham gia phòng chờ ! </span>
                    }
                </Alert>
            </Snackbar>

            <Snackbar open={out} autoHideDuration={2000} onClose={handleCloseOut}>
                <Alert onClose={handleCloseOut} severity="warning" sx={{width: '100%'}}>
                    {console.log("peopleIndex", peopleIndex)}
                    {peopleIndex &&
                        <span> Tài khoản {peopleIndex} vừa rời khỏi phòng chờ ! </span>
                    }
                </Alert>
            </Snackbar>

            {peopleList.length > 1 ?
                <StudentsLounge peopleList={peopleList.filter(item => item.email !== user.info.email)}/> :
                <Typography variant='h4' sx={{
                    mx: {
                        xs: 3,
                        md: 5
                    }
                }}>Bạn là người duy nhất trong phòng ...</Typography>
            }

            <OnStopTestInFormik/>
        </>
    );
}
