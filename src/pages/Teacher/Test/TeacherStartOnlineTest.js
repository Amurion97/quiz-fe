// import { FormControl } from "@mui/base";
import {
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Paper,
    Typography,
    FormControl,
    Box,
} from "@mui/material";
// import { Box, Stack } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Button from "@mui/material/Button";
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import StudentsLounge from "../../Student/GroupTest/StudentsLounge";
import {alpha} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {socket} from "../../../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/user/userSlice";


export function TeacherStartOnlineTest() {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search);
    const roomCode = searchParams.get("code");
    const urlToJoin = `http://localhost:3000/students/groupWaitingRoom?code=${roomCode}`
    console.log("roomCode:", roomCode);


    const user = useSelector(selectUser)

    const [peopleList, setPeopleList] = useState([])
    console.log("peopleList:", peopleList);

    const [isCopied, setIsCopied] = useState(false);
    const [isUrlCopied, setIsUrlCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(roomCode);
        setIsCopied(true);
    };

    const handleCopyUrlClick = () => {
        navigator.clipboard.writeText(urlToJoin);
        setIsUrlCopied(true);
    };

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
                }
            } else if (arg.leave) {
                setPeopleList((list) => list.filter(item => item.email !== arg.email))
            }
        }

        socket.on('lobby-update', onLobbyUpdate)

        return () => {
            socket.off('lobby-update', onLobbyUpdate)
        }

    }, [])
    return (
        <>
            <Grid container>

                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            pt: 8,
                            "& > :not(style)": {
                                width: 450,
                                height: 425,
                            },
                        }}
                    >
                        <Paper sx={{p: 10}} elevation={6}>
                            <Grid container spacing={1}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: -5,
                                    }}
                                >
                                    <Typography fontSize={20}>Online Test</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{textAlign: "center"}}>
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
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography>2: Enter join code</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{textAlign: "center"}}>
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
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mt: 1,
                                    }}
                                >
                                    <Typography>3: Or</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
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
                                    >
                                        QrCode
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>

                <Grid
                    item xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        pt: 4,


                    }}
                >
                    <Button
                        sx={{
                            // width: "230px",
                            // height: 60,
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // bgcolor:'#7CFC00',
                            boxShadow: `5px 5px ${alpha('#595959', 0.4)}`,
                            p: 5,
                            border: '2px solid'
                        }}
                        variant="outlined"
                        // startIcon={<PlayArrowIcon/>}
                        size='large'

                    >
                        <Typography variant='h3'>
                            START
                        </Typography>
                    </Button>
                </Grid>
                <Grid
                    item xs={12}
                >
                    <StudentsLounge peopleList={peopleList}/>
                </Grid>

            </Grid>
        </>
    );
}
