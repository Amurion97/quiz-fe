// import { FormControl } from "@mui/base";
import {
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Paper,
    Typography,
    FormControl,
    Box, Card,
    Dialog,
    DialogTitle,
    DialogContent, Stack,
    Container
} from "@mui/material";
// import { Box, Stack } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Button from "@mui/material/Button";
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import StudentsLounge from "../../../components/StudentsLounge";
import {alpha} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import {socket} from "../../../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/lab";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import QRCode from "qrcode.react";
import MuiAlert from '@mui/material/Alert';

export function TeacherStartOnlineTest() {
    const url = new URL(window.location.href);
    console.log("url:", url)
    const searchParams = new URLSearchParams(url.search);
    const roomCode = searchParams.get("code");
    const testId = searchParams.get("test");
    const urlToJoin = `${url.origin}/students/quizSearch?code=${roomCode}`
    console.log("roomCode:", roomCode);

    const navigate = useNavigate()

    const user = useSelector(selectUser)


    const [isCopied, setIsCopied] = useState(false);
    const [isUrlCopied, setIsUrlCopied] = useState(false);
    const [peopleList, setPeopleList] = useState([])
    console.log("peopleList:", peopleList);

    const [peopleIndex, setPeopleIndex] = useState("");
    // setPeopleList()
    console.log("peopleList:", peopleList);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [out, setOut] = React.useState(false);
    const handleCloseSnackbarIn = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleCloseSnackbarOut = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOut(false)
    };

    const [openSuccess, setOpenSuccess] = React.useState(false);

    const [openQr, setOpenQr] = useState(false);
    const handleOpenQr = () => {
        setOpenQr(true);
    };
    const handleCloseQr = () => {
        setOpenQr(false);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(roomCode);
        setIsCopied(true);
    };

    const handleCopyUrlClick = () => {
        navigator.clipboard.writeText(urlToJoin);
        setIsUrlCopied(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
    };

    const handleKickStudent = (email) => {
        socket.emit('kick-out',
            {roomCode: roomCode, email: user.info.email, targetEmail: email},
            (res) => {
                console.log("kick-out:", res)
            })
    }

    useEffect(() => {
        socket.connect();

        socket.emit('join-lobby',
            {roomCode: roomCode, email: user.info.email},
            (res) => {
                console.log('join-lobby', res);
                setPeopleList(res);
            })

        function onLobbyUpdate(arg) {
            console.log('lobby-update:', arg);
            if (arg.join) {
                if (arg.person.email !== user.info.email) {
                    setPeopleList((list) => [...list, arg.person])
                    setPeopleIndex(arg.person)
                    setOpen(true)
                }
            } else if (arg.leave) {
                setPeopleList((list) => list.filter(item => item.email !== arg.email))
                setPeopleIndex(arg.email)
                setOut(true)
            }
        }

        socket.on('lobby-update', onLobbyUpdate)

        return () => {
            socket.off('lobby-update', onLobbyUpdate)
        }

    }, [])

    function startTest() {
        socket.emit('start-test', {roomCode: roomCode, email: user.info.email}, (res) => {
            console.log('start-test', res);
            setOpenSuccess(true);
            setTimeout(() => {
                navigate(`/dashboard/test-statistic?code=${roomCode}&test=${testId}`,
                    {
                        state: {
                            peopleList: peopleList
                        }
                    });
            }, 500)
        })
    }

    return (
        <>
            <Helmet>
                <title> Sảnh chờ thi | Quiz </title>
            </Helmet>


            <Grid container>

                <Grid item xs={12}>
                    <Container maxWidth="xs"
                               sx={{
                                   // display: "flex",
                                   // flexWrap: "wrap",
                                   // flex: 1,
                                   // justifyContent: "center",
                                   // alignItems: "center",
                                   pt: 8,

                               }}
                    >
                        <Paper sx={{

                            px: {xs: 2, sm: 4, md: 6},
                            py: 6,
                        }} elevation={6}>

                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}>

                                <Typography fontSize={20}>Online Test</Typography>

                                <FormControl
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                    variant="outlined"
                                >
                                    <OutlinedInput
                                        sx={{
                                            mx: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                        }}
                                        endAdornment={
                                            <InputAdornment>
                                                <IconButton
                                                    aria-label="copy url to join"
                                                    edge="end"
                                                    sx={{bgcolor: "#EDEDF6"}}
                                                    onClick={handleCopyUrlClick}
                                                >
                                                    {isUrlCopied ? (
                                                        <DoneAllTwoToneIcon sx={{maxHeight: "100%"}}/>
                                                    ) : (
                                                        <ContentCopyIcon sx={{maxHeight: "100%"}}/>
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                        value={urlToJoin}
                                    />
                                </FormControl>

                                <Typography>2: Enter join code</Typography>

                                <FormControl
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                    variant="outlined"
                                >
                                    <OutlinedInput
                                        sx={{
                                            mx: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            '& input': {
                                                textAlign: 'center',
                                            },
                                        }}
                                        endAdornment={
                                            <InputAdornment>
                                                <IconButton
                                                    aria-label="copy join code"
                                                    edge="end"
                                                    sx={{bgcolor: "#EDEDF6"}}
                                                    onClick={handleCopyClick}
                                                >
                                                    {isCopied ? (
                                                        <DoneAllTwoToneIcon sx={{maxHeight: "100%"}}/>
                                                    ) : (
                                                        <ContentCopyIcon sx={{maxHeight: "100%"}}/>
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        value={roomCode}
                                    />
                                </FormControl>

                                <Typography>3: Or</Typography>

                                <Button
                                    sx={{
                                        width: "70%",
                                        height: 50,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: 2,
                                    }}
                                    variant="outlined"
                                    startIcon={<QrCodeIcon/>}
                                    onClick={handleOpenQr}
                                >
                                    QrCode
                                </Button>

                            </Stack>


                        </Paper>
                    </Container>
                </Grid>

                <Grid
                    item xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pt: 2,

                    }}
                >
                    <Button
                        sx={{
                            boxShadow: `5px 5px ${alpha('#595959', 0.4)}`,
                            p: {
                                xs: 3,
                                md: 5
                            },
                            border: '1px solid',
                        }}
                        variant="outlined"
                        size='large'
                        onClick={startTest}

                    >
                        <Typography variant='h3'>
                            START
                        </Typography>
                    </Button>
                </Grid>

                <Grid
                    item xs={12}
                    container
                    justifyContent="flex-end"
                    sx={{
                        px: {
                            xs: 2,
                            md: 2,
                            lg: 10
                        },
                        pt: 3
                    }}
                >
                    <Card sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        px: 3,
                    }}>
                        <Box sx={{
                            display: "flex", alignItems: "center",
                            py: 1,
                        }}>
                            <GroupsTwoToneIcon fontSize='large'/>
                            <Typography variant='h4' sx={{ml: "4px"}}>{peopleList.length}</Typography>
                        </Box>
                    </Card>
                </Grid>

                <Grid
                    item xs={12}
                >
                    <StudentsLounge peopleList={peopleList} kickStudent={handleKickStudent}/>
                </Grid>

            </Grid>

            <Snackbar open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Đang bắt đầu cuộc thi...
                </Alert>
            </Snackbar>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnackbarIn}>
                <Alert onClose={handleCloseSnackbarIn} severity="info" color="primary" sx={{width: '100%'}}>
                    {console.log("peopleIndex", peopleIndex)}
                    {peopleIndex &&
                        <span> Tài khoản {peopleIndex.email} vừa tham gia phòng chờ ! </span>
                    }
                </Alert>
            </Snackbar>
            <Snackbar open={out} autoHideDuration={2000} onClose={handleCloseSnackbarOut}>
                <Alert onClose={handleCloseSnackbarOut} severity="warning" sx={{width: '100%'}}>
                    {console.log("peopleIndex", peopleIndex)}
                    {peopleIndex &&
                        <span> Tài khoản {peopleIndex} vừa rời khỏi phòng chờ ! </span>
                    }
                </Alert>
            </Snackbar>

            <Dialog open={openQr} onClose={handleCloseQr}>
                <DialogTitle>
                    <Typography fontSize={20}>
                        Quét mã QR để tham gia ngay
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <input type="hidden" value={urlToJoin}/>
                    {urlToJoin && <QRCode size={300} value={urlToJoin}/>}


                </DialogContent>

                <DialogContent>
                    <Typography>Hoặc nhập mã : {roomCode}</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}