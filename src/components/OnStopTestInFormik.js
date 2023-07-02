import {useEffect, useState} from "react";
import {socket} from "../app/socket";
import {Alert} from "@mui/lab";
import {Backdrop} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function OnStopTestInFormik({submitForm}) {
    const navigate = useNavigate()

    const [socketMessage, setSocketMessage] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        console.log('this [] effect on OnStopTestInFormik is running')

        function onStopTest(args) {
            console.log('stop-test:', args)
            setSocketMessage(args.message)
            handleOpen();
            if (submitForm) {
                setTimeout(() => {
                    submitForm()
                }, 3000);
            }
        }

        function onKickOut(args) {
            console.log('kick-out:', args)
            setSocketMessage(args.message)
            handleOpen();
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }

        if (submitForm) {
            socket.on('stop-test', onStopTest)
        }


        socket.on('kick-out', onKickOut);

        return () => {
            if (submitForm) {
                socket.off('stop-test', onStopTest)
            }

            socket.off('kick-out', onKickOut);
        }
    }, [])
    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
            >
                <Alert severity="error">{socketMessage}</Alert>
            </Backdrop>
        </>
    )
}