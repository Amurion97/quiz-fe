import {useEffect, useState} from 'react';
// @mui
import {

    MenuItem,
    FormControl,
    Grid, Paper,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {styled, useTheme} from "@mui/material/styles";
import MuiTextField from '@mui/material/TextField';
import { Field, Form, Formik} from "formik";
import * as yup from 'yup';
import {
    Autocomplete, Select,
    TextField
} from 'formik-mui';
import {customAPIv1} from "../../features/customAPI";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import NumberField from "./Field/NumberField";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import VNNumParser from "../../functions/NumberParser";

// components
const StyleForm = styled(Grid)(({theme}) => ({
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "15px 25px 25px",
    borderRadius: "4px",
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
const formSubmition = (values, {setSubmitting}) => {
    console.log("trying to submit:", values);
    if (values.start && values.end) {
        console.log(values.start, values.end);
        let start = new Date(values.start)
        let end = new Date(values.end);
        console.log(start, end)
        if (start >= end) {
            // errors.start = 'Start time must smaller than arrival time'
            // errors.end = 'Start time must smaller than arrival time'
            window.alert('Start time must smaller than arrival time');
            setSubmitting(false)
            return
        }
    }

    let rows = [];
    for (let i = 0; i < parseInt(values.rows); i++) {
        rows.push({
            name: String.fromCharCode(65 + i),
            price: values[`price-${i}`] ? VNNumParser.parse(values[`price-${i}`]) : null,
            class: parseInt(values[`class-${i}`]),
        })
    }
    console.log("rows:", rows)
    try {
        customAPIv1().post("/flights", {
            name: values.name,
            aircraft: values.aircraft.id,
            start: values.start,
            end: values.end,
            from: values.from.id,
            to: values.to.id,
            rows: rows,
            seats: parseInt(values.seats)
        })
            .then(() => {
                setSubmitting(false)
            })
    } catch (e) {
        console.log("error in save flight:", e);
        window.alert('failed, try again');
        setSubmitting(false)
    }
    console.log()
}
// ----------------------------------------------------------------------

export default function FlightCreationForm() {
    const theme = useTheme();
    const [airlines, setAirlines] = useState([]);
    const [chosenAirline, setChosenAirline] = useState(0);
    const [aircraft, setAircraft] = useState([]);
    const [airports, setAirports] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [maxSeatInARow, setMaxSeatInARow] = useState(1);
    const [rowNumber, setRowNumber] = useState(0);

    let rows = new Array(rowNumber ? rowNumber : 0);
    rows.fill(0)
    rows = rows.map((item, index) => {
        let row = new Object()
        row.name = String.fromCharCode(65 + index)
        return row
    })
    let seats = new Array(maxSeatInARow ? maxSeatInARow : 0)
    seats.fill(0)

    let customStyleForPlane = {
        '.plane': {
            maxWidth: `${50 * (maxSeatInARow + 1)}px`,
        },
        '.seat': {
            flex: `0 0 ${100 / (maxSeatInARow + 1)}%`,
        },
        '.cockpit': {
            height: "150px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            borderBottom: "5px solid #d8d8d8",
        },
        ".cockpit:before": {
            height: "300px",
            width: "100%",
            borderRadius: "50%",
        },

        [`.seat:nth-child(${Math.floor(maxSeatInARow / 2)})`]: {
            // [`.seat:nth-child(3)`]: {
            marginRight: `${100 / (maxSeatInARow + 1)}%`,
        },
        color: theme.palette.primary.main
    }

    useEffect(() => {
        console.log("form did mount");
        customAPIv1().get("airlines")
            .then(res => {
                console.log("airlines:", res.data);
                setAirlines(res.data.data.map(item => {
                    return {
                        label: item.name,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get airlines:", e))

        customAPIv1().get("/airports")
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

        customAPIv1().get("/classes")
            .then(res => {
                console.log("classes:", res.data.data);
                setClassOptions(res.data.data)
            })
            .catch(e => console.log("error in get classes:", e))
    }, [])

    useEffect(() => {
        customAPIv1().get(`aircraft/airlines/${chosenAirline}`)
            .then(res => {
                console.log("aircraft:", res.data);
                setAircraft(res.data.data.map(item => {
                    return {
                        label: `${item.name}`,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get aircraft:", e))
    }, [chosenAirline])
    return (
        <>
            <Formik
                initialValues={{}}
                validate={(values) => {
                    const errors = {};

                    return errors;
                }}
                onSubmit={formSubmition}
            >
                {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (
                    <Form>
                        <StyleForm container spacing={1}>
                            <Grid item xs={6}>
                                <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                                    <Grid item xs={4} sm={4} md={6}>
                                        <p>{JSON.stringify(errors)}</p>
                                        <Field
                                            name="airline"
                                            component={Autocomplete}
                                            options={airlines}
                                            fullWidth
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, value) => {
                                                console.log(value)
                                                setChosenAirline(value.id)
                                                setFieldValue("airline", value)
                                            }}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    {...params}
                                                    name="airline"
                                                    error={touched['airline'] && !!errors['airline']}
                                                    helperText={touched['airline'] && errors['airline']}
                                                    label="Airline"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={6}>
                                        <Field
                                            name="aircraft"
                                            component={Autocomplete}
                                            options={aircraft}
                                            fullWidth
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <MuiTextField
                                                    {...params}
                                                    name="aircraft"
                                                    error={touched['aircraft'] && !!errors['aircraft']}
                                                    helperText={touched['aircraft'] && errors['aircraft']}
                                                    label="Aircraft"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
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
                                        <FormControl fullWidth>
                                            <Field
                                                component={DateTimePicker}
                                                name="start"
                                                label="Departure Time"
                                                onChange={(e) => {
                                                    let start = new Date(e.$d);
                                                    setFieldValue("start", start.toLocaleString());
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={6}>
                                        <FormControl fullWidth>
                                            <Field component={DateTimePicker}
                                                   name="end"
                                                   label="Arrival Time"
                                                   onChange={(e) => {
                                                       let end = new Date(e.$d);
                                                       setFieldValue("end", end.toLocaleString());

                                                   }}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={6}>
                                        <FormControl fullWidth>
                                            <Field
                                                component={TextField}
                                                type="number"
                                                label="Number of Rows"
                                                name="rows"
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setRowNumber(parseInt(e.target.value));
                                                    setFieldValue("rows", e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={6}>
                                        <FormControl fullWidth>
                                            <Field
                                                component={TextField}
                                                type="number"
                                                label="Number of Seats each Row"
                                                name="seats"
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setMaxSeatInARow(parseInt(e.target.value));
                                                    setFieldValue("seats", e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={6}>
                                        <FormControl fullWidth>
                                            <Field
                                                component={TextField}
                                                type="text"
                                                label="Flight name"
                                                name="name"
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4} sm={4} md={6}>
                                        <LoadingButton fullWidth size="large" type="button" variant="contained"
                                                       onClick={
                                                           submitForm
                                                       }
                                                       style={{
                                                           height: "100%"
                                                       }}
                                                       loading={isSubmitting}
                                                       loadingPosition="start"
                                                       startIcon={<DoneOutlineIcon/>}>
                                            <span>{(isSubmitting) ? "Saving…" : "Save this flight"}</span>
                                        </LoadingButton>
                                    </Grid>

                                    {rows.map((row, index) => (
                                        <Grid item xs={4} sm={8} md={12}>
                                            <Grid container spacing={{xs: 1, md: 2}}>
                                                <Grid item xs={2}>
                                                    <Paper elevation={3} sx={{
                                                        height: "100%",
                                                        width: "100%",
                                                        textAlign: 'center',
                                                        verticalAlign: "middle",
                                                        color: theme.palette.primary.contrastText,
                                                        backgroundColor: theme.palette.primary.main,
                                                        lineHeight: '60px',

                                                    }}>
                                                        {`Row ${row.name}`}
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth>
                                                        <Field
                                                            component={Select}
                                                            type="text"
                                                            label="Travel Class"
                                                            name={`class-${index}`}
                                                            inputProps={{
                                                                name: `class-${index}`,
                                                                id: 'class'
                                                            }}
                                                        >
                                                            {classOptions.map(item => (
                                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                                            ))}
                                                        </Field>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl fullWidth>
                                                        <Field
                                                            component={NumberField}
                                                            // type="number"
                                                            label="Price"
                                                            name={`price-${index}`}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}

                                </Grid>
                            </Grid>
                            <Grid item xs={6} sx={customStyleForPlane}>
                                <div className="plane">
                                    <div className="cockpit">
                                        {/*<h1>{values["from"]["label"]} <br/>to<br/> {values["to"]["label"]}<br/>Seat*/}
                                        {/*    Selection</h1>*/}
                                    </div>
                                    <div className="exit exit--front fuselage">
                                    </div>
                                    <ol className="cabin fuselage">
                                        {rows.map((row, rowIndex) => (
                                            <li key={row.name} className={`row`}>
                                                <ol className="seats" type={"A"}>
                                                    {
                                                        seats.map((seat, index) => {
                                                            let name = `${row.name}${index + 1}`
                                                            return (
                                                                <li key={name} className="seat">
                                                                    <input
                                                                        type="checkbox"/>
                                                                    <label className='noselect'
                                                                           htmlFor={name}>{name}</label>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ol>
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="exit exit--back fuselage">

                                    </div>
                                </div>
                            </Grid>
                        </StyleForm>
                    </Form>
                )}
            </Formik>
        </>
    );
}
