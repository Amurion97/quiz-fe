
// @mui
import {
    FormControl,
    Grid,
} from '@mui/material';
import {Field} from "formik";
import {
    TextField
} from 'formik-mui';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

// components

// ----------------------------------------------------------------------

export default function IdentityForm(props) {
    return (
        <>
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
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
                        name={`idNo-${props.index}`}
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
