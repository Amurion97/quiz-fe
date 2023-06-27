import {Field, Form, Formik} from "formik";
import {
    Collapse,
    FormControl,
    IconButton,
    Snackbar,
    Stack,
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { TextField} from "formik-mui";
import React, { useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import * as Yup from "yup";
import MuiAlert from "@mui/material/Alert";


export default function AddTagForm(props) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
        setOpen(false)
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const SchemaError = Yup.object().shape({
        name: Yup.string()
            .min(2, "Quá ngắn!")
            .required("Required"),
    })
    return (
        <Formik
            initialValues={{
                name: "",
            }}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            validationSchema={SchemaError}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log("trying to submit:", values)
                // try {
                customAPIv1().post("/tags", values)
                    .then((response)=> {
                        console.log("Add Tag success");
                        resetForm();
                        setSubmitting(false);
                        setOpenSuccess(true);
                        setOpen(false)
                        props.updateTag();
                    })
                    .catch(e => {
                        console.log("error:", e);
                        setOpen(true)
                        setOpenSuccess(false)
                        setSubmitting(false);
                    })
            }}
        >
            {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                <Form>
                    <Stack spacing={1} mb={3}>
                        <FormControl fullWidth>

                        </FormControl>
                        <FormControl fullWidth>

                        </FormControl>
                        <Field
                            component={TextField}
                            type="text"
                            label="Nhập tên thẻ..."
                            name="name"
                            fullWidth
                        />


                    </Stack>

                    <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                        Lưu thẻ
                    </LoadingButton>
                    <Stack spacing={2} sx={{width: '100%'}}>
                            <Snackbar open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                Thêm thẻ thành công!
                                </Alert>
                            </Snackbar>

                            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                                Thẻ đã có sẵn!
                                </Alert>
                            </Snackbar>
                        </Stack>
                </Form>
            )}
        </Formik>
    );
}