// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Grid, Paper, Typography} from '@mui/material';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {customAPIv1} from "../features/customAPI";
// components

// sections
const StyledRoot = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
}));
const CssDatePicker = styled(DatePicker)(({theme}) => ({
    color: "red",
    '& label.Mui-focused': {
        color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.primary.contrastText,
        height: "2.5rem",
        color: theme.palette.primary.main,
        // '& fieldset': {
        //     borderColor: theme.palette.secondary.main,
        // },
        // '&:hover fieldset': {
        //     borderColor: theme.palette.secondary.main,
        // },
        // '&.Mui-focused fieldset': {
        //     borderColor: theme.palette.secondary.main,
        // },
    },
}));

// ----------------------------------------------------------------------

export default function BookingBar(props) {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("searchParams in Booking Bar:", searchParams.get("start"),);
    // const from = searchParams.get("from");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [seatClass, setSeatClass] = useState("");
    useEffect(() => {
        customAPIv1().get(`/airports/${searchParams.get("from")}`)
            .then(res => {
                setFrom(res.data.data)
            })
            .catch(e => {
                console.log("error in get From City:", e)
            })
        customAPIv1().get(`/airports/${searchParams.get("to")}`)
            .then(res => {
                setTo(res.data.data)
            })
            .catch(e => {
                console.log("error in get To City:", e)
            })
        if (searchParams.get("class")) {
            customAPIv1().get(`/classes/${searchParams.get("class")}`)
                .then(res => {
                    setSeatClass(res.data.data)
                })
                .catch(e => {
                    console.log("error in get seat Class:", e)
                })
        }

    }, [])
    return (
        <>
            <StyledRoot>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography variant="h5" gutterBottom>
                            {from.name} ({from.code}) - {to.name} ({to.code})
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {seatClass ? seatClass.name : "All Classes"}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <CssDatePicker label=""
                                       readOnly
                                       defaultValue={dayjs(searchParams.get("start"))}
                                       format="LL"
                        />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <CssDatePicker label=""
                                       readOnly
                                       defaultValue={dayjs(searchParams.get("return"))}
                                       format="LL"

                        />
                    </Grid>
                </Grid>
            </StyledRoot>
        </>
    );
}
