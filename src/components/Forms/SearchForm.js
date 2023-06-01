import {useEffect, useState} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';
// @mui
import {

    FormControlLabel,
    Radio,
    MenuItem,
    FormControl,
    Grid,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {styled, useTheme} from "@mui/material/styles";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import MuiTextField from '@mui/material/TextField';
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import * as yup from 'yup';
import {
    Autocomplete,
    Select,
    RadioGroup,
} from 'formik-mui';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useDispatch} from "react-redux";
import {fetchFlights} from "../../features/flight/flightSlice";
import {DateRangeCalendar} from '@mui/x-date-pickers-pro/DateRangeCalendar';
import {DateRangePicker} from "@mui/x-date-pickers-pro";
// import {DatePicker} from 'formik-mui-lab';

// components

const StyledContent = styled('div')(({theme}) => ({
    // maxHeight: "60%",
    // margin: 'auto',
    display: 'flex',
    // minWidth: "60%",
    maxWidth: "70vw",
    width: "100%",
    minWidth: "60%",
    flexDirection: 'column',
    // padding: theme.spacing(12, 0),
    backgroundColor: '#ffffff',
    padding: "15px 25px 25px",
    borderRadius: "4px"
}));
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});
// ----------------------------------------------------------------------

export default function SearchForm() {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const handleClick = () => {
        setLoading(true)
        // navigate('/dashboard', {replace: true});
    };
    const [loading, setLoading] = useState(false);
    const [airports, setAirports] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    useEffect(() => {
        console.log("form did mount");
        axios.get("http://127.0.0.1:5000/v1/airports")
            .then(res => {
                console.log("airports:", res.data.data);
                setAirports(res.data.data.map(item => {
                    return {
                        label: `${item.name}, ${item.city}, ${item.country}`,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get airport:", e))
        axios.get("http://127.0.0.1:5000/v1/classes")
            .then(res => {
                console.log("classes:", res.data.data);
                setClassOptions(res.data.data)
            })
            .catch(e => console.log("error in get classes:", e))
    }, [])
    return (
        <>
            <StyledContent>
                <Formik
                    initialValues={{
                        way: 'one',
                    }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("trying to submit:", values)
                        dispatch(fetchFlights({
                            query: values
                        }))
                            .then(data => {
                                console.log("thunk data:", data);
                                if (data.type.includes("rejected")) {
                                    setSubmitting(false);
                                } else if (data.type.includes("fulfilled")) {
                                    setSubmitting(false);
                                    navigate({
                                        pathname: "/results",
                                        search: createSearchParams({
                                            from: values.from.id,
                                            to: values.to.id,
                                            start: values.start ? values.start.split(",")[0] : "",
                                            "return": values.return ? values.return.split(",")[0] : "",
                                            class: values.class,
                                        }).toString()
                                    })
                                }
                            })
                    }}
                >
                    {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                        <Form>
                            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Field component={RadioGroup} name="way">
                                        <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                                            <Grid item xs={4} sm={4} md={6}>
                                                <FormControlLabel
                                                    value="two"
                                                    control={<Radio/>}
                                                    label="Roundtrip"
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={6}>
                                                <FormControlLabel
                                                    value="one"
                                                    control={<Radio/>}
                                                    label="Oneway"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Field>
                                </Grid>

                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        name="from"
                                        component={Autocomplete}
                                        options={airports}
                                        style={{width: "100%"}}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                name="from"
                                                error={touched['from'] && !!errors['from']}
                                                helperText={touched['from'] && errors['from']}
                                                label="Flying From"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        name="to"
                                        component={Autocomplete}
                                        options={airports}
                                        style={{width: "100%"}}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                name="to"
                                                error={touched['to'] && !!errors['to']}
                                                helperText={touched['to'] && errors['to']}
                                                label="Flying To"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        component={DatePicker}
                                        name="start"
                                        label="Departure date"
                                        onChange={(e) => {
                                            let start = new Date(e.$d);
                                            setFieldValue("start", start.toLocaleString());
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        component={DatePicker}
                                        name="return"
                                        label="Return date"
                                        onChange={(e) => {
                                            let start = new Date(e.$d);
                                            setFieldValue("return", start.toLocaleString());
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={4} sm={4} md={6}>
                                    <FormControl fullWidth>
                                        <Field
                                            component={Select}
                                            type="text"
                                            label="Travel Class"
                                            name="class"
                                            inputProps={{name: 'class', id: 'class'}}
                                        >
                                            {classOptions.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <LoadingButton fullWidth size="large" type="submit" variant="contained"
                                                   onClick={
                                                       submitForm
                                                   }
                                                   style={{
                                                       height: "100%"
                                                   }}
                                                   loading={isSubmitting}
                                                   loadingPosition="start"
                                                   startIcon={<SearchIcon/>}>
                                        <span>{(isSubmitting) ? "Searching…" : "Search flights"}</span>
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

            </StyledContent>

        </>
    );
}
