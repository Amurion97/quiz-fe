// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Grid, Paper, Typography} from '@mui/material';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
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
    console.log("searchParams:", searchParams);
    // const from = searchParams.get("from");
    const [from, setFrom] = useState("");
    return (
        <>
            <StyledRoot>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={4} sm={4} md={4}>
                        <Typography variant="h5" gutterBottom>
                            Barcelona (BCN) - Rome (ROM)
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Economy
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <CssDatePicker label=""
                                       readOnly
                                       defaultValue={dayjs('2022-04-17')}
                                       format="LL"
                        />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <CssDatePicker label=""
                                       readOnly
                                       defaultValue={dayjs('2022-04-17')}
                                       format="LL"
                        />
                    </Grid>
                </Grid>
            </StyledRoot>
        </>
    );
}
