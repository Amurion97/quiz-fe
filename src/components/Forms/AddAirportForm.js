import {Field, Form, Formik} from "formik";
import {
    Collapse,
    FormControl,
    IconButton,
    MenuItem,
    Stack,
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {Select, TextField} from "formik-mui";
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";


export default function AddAirportForm(props) {
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        console.log("form did mount");
    }, [])
    return (
        <Formik
            initialValues={{}}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log("trying to submit:", values)
                // try {
                customAPIv1().post("/airports", values)
                    .then((response)=> {
                        console.log("Add airports success");
                        resetForm();
                        setSubmitting(false);
                        setOpenSuccess(true);
                        props.updateAircraft();
                    })
                    .catch(e => {
                        console.log("error:", e);
                        setSubmitting(false);
                    })
            }}
        >
            {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                <Form>
                    <Stack spacing={3} mb={3}>
                        <Collapse in={openSuccess}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpenSuccess(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit"/>
                                    </IconButton>
                                }
                                sx={{mb: 2}}
                                variant="filled" severity="success"
                            >
                                Add airport successfully
                            </Alert>
                        </Collapse>

                        <Field
                            component={TextField}
                            type="text"
                            label="ID"
                            name="id"
                            fullWidth
                        />

                        <Field
                            component={TextField}
                            type="text"
                            label="Name"
                            name="name"
                            fullWidth
                        />

                        <Field
                            component={TextField}
                            type="text"
                            label="Code"
                            name="code"
                            fullWidth
                        />

                        <Field
                            component={TextField}
                            type="text"
                            label="City"
                            name="city"
                            fullWidth
                        />

                        <Field
                            component={TextField}
                            type="text"
                            label="Country"
                            name="country"
                            fullWidth
                        />

                    </Stack>

                    <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                        Save airport
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    );
}