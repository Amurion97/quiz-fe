import {Field, Form, Formik} from "formik";
import {Collapse, IconButton, Paper, Stack} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {TextField} from "formik-mui";
import {useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import UpperCasingTextField from "./Field/UpperCasingTextField";
import {useNavigate} from "react-router-dom";


export default function TicketCheckForm(props) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    return (
        <Paper style={{
            minWidth: "60%",
            // backgroundColor: '#ffffff',
            padding: "15px 25px 25px",
        }}
               padding={3}>


            <Formik
                initialValues={{}}
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    console.log("trying to submit:", values)
                    // try {
                    customAPIv1().post("/bookings/search", values)
                        .then((response) => {
                            console.log("Search for booking success");
                            setSubmitting(false);
                            setOpen(false);
                            navigate('/booking', {
                                state: response.data.data
                            })
                        })
                        .catch(e => {
                            console.log("error:", e);
                            setOpen(true)
                            setSubmitting(false);
                        })
                }}
            >
                {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                    <Form>
                        <Stack spacing={3} mb={3}>
                            <Collapse in={open}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                    sx={{mb: 2}}
                                    variant="filled" severity="error"
                                >
                                    Wrong contact information, please fill in both correct emmail and phone number used
                                    when booking
                                </Alert>
                            </Collapse>

                            <Field
                                component={UpperCasingTextField}
                                type="email"
                                label="Email"
                                name="email"
                                fullWidth
                            />
                            <Field
                                component={TextField}
                                type="text"
                                label="Phone number"
                                name="phoneNumber"
                                fullWidth
                            />


                        </Stack>

                        <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                            Find my booking
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
}