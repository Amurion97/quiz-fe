import {Field, Form, Formik} from "formik";
import {
    Collapse,
    FormControl,
    IconButton,
    Stack,
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { TextField} from "formik-mui";
import { useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import * as Yup from "yup";


export default function AddTagForm(props) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const SchemaError = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .required("Required"),
    })
    return (
        <Formik
            initialValues={{}}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            validationSchema={SchemaError}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log("trying to submit:", values)
                // try {
                customAPIv1().post("/tag", values)
                    .then((response)=> {
                        console.log("Add Tag success");
                        resetForm();
                        setSubmitting(false);
                        setOpenSuccess(true);
                        props.updateTag();
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
                                Add tag successfully
                            </Alert>
                        </Collapse>
                        <FormControl fullWidth>

                        </FormControl>
                        <Field
                            component={TextField}
                            type="text"
                            label="Name Tag"
                            name="name"
                            fullWidth
                        />


                    </Stack>

                    <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                        Save
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    );
}