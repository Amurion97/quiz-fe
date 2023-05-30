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
import UpperCasingTextField from "./UpperCasingTextField";
// import {DatePicker} from 'formik-mui-lab';

// components

// ----------------------------------------------------------------------

export default function IdentityForm(props) {
    return (
        <>
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}
                  // style={{
                  //     display: (props.activeStep == 0) ? "flex" : "none"
                  // }}
            >
                <Grid item xs={4} sm={8} md={12}>
                    <p>Person at seat {props.name} </p>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                    <Field
                        component={TextField}
                        type="text"
                        label="First Name"
                        name={`firstName-${props.index}`}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <Field
                        component={TextField}
                        type="text"
                        label="Middle Name"
                        name={`middleName-${props.index}`}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <Field
                        component={TextField}
                        type="text"
                        label="Last Name"
                        name={`lastName-${props.index}`}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={4} sm={4} md={6}>
                    <Field
                        component={TextField}
                        name={`id-${props.index}`}
                        type="text"
                        label="ID No."
                        helperText="Please Enter Your Identification Number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={6}>
                    <FormControl fullWidth>
                        <Field
                            component={DatePicker}
                            name="dob"
                            label="Date of Birth"
                            fullWidth
                            onChange={(e) => {
                                let start = new Date(e.$d);
                                props.setFieldValue(`dob-${props.index}`, start.toLocaleString());
                            }}
                        />
                    </FormControl>
                </Grid>

            </Grid>
        </>
    );
}
