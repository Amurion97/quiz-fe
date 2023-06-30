import {useEffect, useState} from "react";
import {socket} from "../app/socket";
import {Alert} from "@mui/lab";
import {Backdrop} from "@mui/material";

export function OnStopTestInFormik({submitForm}) {
    const [socketMessage, setSocketMessage] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        console.log('this [] effect on OnStopTestInFormik is running')
        socket.on('stop-test', args => {
            console.log('stop-test:', args)
            setSocketMessage(args.message)
            handleOpen();
            submitForm()
        })
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