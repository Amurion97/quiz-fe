import {useEffect, useState} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';
// @mui
import {
    FormControlLabel,
    Radio,
    InputLabel,
    MenuItem,
    FormControl,
    Grid,
    Button,
    DialogTitle,
    DialogContent, DialogActions, DialogContentText, Dialog, Box,
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
    TextField,
    Select,
    RadioGroup,
} from 'formik-mui';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {fetchFlights} from "../features/flight/flightSlice";
import {useDispatch} from "react-redux";
import UpperCasingTextField from "./UpperCasingTextField";
import Ticket from "./Ticket";
// import {DatePicker} from 'formik-mui-lab';

// components

const StyledContent = styled('div')(({theme}) => ({
    display: 'flex',
    width: "100%",
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: "15px 25px 25px",
    borderRadius: "4px"
}));
// ----------------------------------------------------------------------

export default function AddressForm(props) {
    const theme = useTheme();
    const [cities, setCities] = useState([]);
    const [chosenCity, setChosenCity] = useState(0);
    const [districts, setDistricts] = useState([]);
    const [chosenDistrict, setchosenDistrict] = useState(0);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        console.log("form did mount");
        axios.get("https://provinces.open-api.vn/api/p")
            .then(res => {
                console.log("cities:", res.data);
                setCities(res.data.map(item => {
                    return {
                        label: `${item.name}`,
                        id: item.code
                    }
                }))
            })
            .catch(e => console.log("error in get cities:", e))
    }, [])

    useEffect(() => {
        axios.get(`https://provinces.open-api.vn/api/p/${chosenCity}?depth=2`)
            .then(res => {
                console.log("districts:", res.data);
                setDistricts(res.data.districts.map(item => {
                    return {
                        label: `${item.name}`,
                        id: item.code
                    }
                }))
            })
            .catch(e => console.log("error in get districts:", e))
    }, [chosenCity])
    useEffect(() => {
        axios.get(`https://provinces.open-api.vn/api/d/${chosenDistrict}?depth=2`)
            .then(res => {
                console.log("wards:", res.data);
                setWards(res.data.wards.map(item => {
                    return {
                        label: `${item.name}`,
                        id: item.code
                    }
                }))
            })
            .catch(e => console.log("error in get wards:", e))
    }, [chosenDistrict])
    return (
        <>
            <StyledContent>
                <Formik
                    initialValues={{}}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("trying to submit:", values)

                    }}
                >
                    {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                        <Form>
                            <p>{JSON.stringify(values)}</p>
                            <p>{values.address}, {values.ward ? values.ward.label : ""}, {values.district ? values.district.label : ""},
                                {values.city ? values.city.label : ""}</p>
                            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        name="city"
                                        component={Autocomplete}
                                        options={cities}
                                        fullWidth
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => {
                                            setChosenCity(value.id)
                                            setFieldValue("city", value)
                                        }}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                name="city"
                                                error={touched['city'] && !!errors['city']}
                                                helperText={touched['city'] && errors['city']}
                                                label="City"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        name="district"
                                        component={Autocomplete}
                                        options={districts}
                                        fullWidth
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, value) => {
                                            setchosenDistrict(value.id)
                                            setFieldValue("district", value)
                                        }}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                name="district"
                                                error={touched['district'] && !!errors['district']}
                                                helperText={touched['district'] && errors['district']}
                                                label="District"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        name="ward"
                                        component={Autocomplete}
                                        options={wards}
                                        fullWidth
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                name="ward"
                                                error={touched['ward'] && !!errors['ward']}
                                                helperText={touched['ward'] && errors['ward']}
                                                label="Ward"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={4} md={6}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Address"
                                        name="address"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </StyledContent>

        </>
    );
}
