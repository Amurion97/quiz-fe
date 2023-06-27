import {useState} from "react";
import TextField from "@mui/material/TextField";
import {Backdrop, Button, Paper, Stack} from "@mui/material";
import {alpha, useTheme} from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import {socket} from "../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/lab";

export function CodeEnterBox() {
    const [roomCode, setRoomCode] = useState('');
    const theme = useTheme();
    const user = useSelector(selectUser);
    const navigate = useNavigate()

    const [socketMessage, setSocketMessage] = useState('')
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    function submitJoinCode() {
        console.log('trying to join room:', roomCode);
        socket.connect();

        socket.emit('join-lobby',
            {roomCode: roomCode, email: user.info.email},
            (res) => {
                console.log('join-lobby', res);
                if (res.success === false) {
                    // window.alert(res.message);
                    setSocketMessage(res.message)
                    handleOpen();

                } else {
                    navigate(`/students/groupWaitingRoom?code=${roomCode}`, {
                        state: {peopleList: res}
                    })
                }
            })
    }

    return (<>
        <Paper elevation={4}
               sx={{
                   display: 'grid',
                   my: 10,
                   mx: 30,
                   py: 10,
               }}>
            <Paper variant="outlined"
                   sx={{
                       // width: 'fit-content',
                       placeSelf: 'center',
                       height: 'fit-content',
                       p: 1,
                       bgcolor: (theme) => theme.palette.background.default,
                       width: 'min(100%, 600px)'
                   }}>
                <Stack direction={'row'} spacing={1}>
                    <OutlinedInput placeholder='Nhập code'
                                   value={roomCode}
                                   onChange={(e) => {
                                       setRoomCode(e.target.value)
                                   }}
                                   color={'secondary'}
                                   style={{
                                       // borderRadius: theme.shape.borderRadius,
                                   }}

                                   sx={{
                                       bgcolor: (theme) => theme.palette.background.paper,
                                       width: '100%',
                                   }}
                                   autoFocus={true}

                    />
                    <Button variant='contained' color='secondary' size='large'
                            sx={{
                                height: '60px',
                                boxShadow: `0px 5px ${alpha(theme.palette.secondary.main, 0.4)}`,
                            }}
                            onClick={submitJoinCode}
                    >VÀO PHÒNG THI</Button>
                </Stack>

            </Paper>
        </Paper>

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <Alert severity="error">{socketMessage}</Alert>
        </Backdrop>
    </>)
}