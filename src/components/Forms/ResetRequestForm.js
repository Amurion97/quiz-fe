import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
    Link,
    Stack,
    IconButton,
    InputAdornment,
    TextField as TextFieldMUI,
    Grid,
    Collapse,
} from "@mui/material";
import { Alert, LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { TextField } from "formik-mui";
import CloseIcon from "@mui/icons-material/Close";
import { forgotPassword } from "../../features/user/userSlice";
import { customAPIv1 } from "../../features/customAPI";

// components

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [statusCode, setStatusCode] = useState(0);

    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                }}
                validate={(values) => {
                    setOpen(false);
                    setOpenSuccess(false);
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("trying to submit:", values);
                    customAPIv1()
                        .post("users/reset-request", values)
                        .then((data) => {
                            console.log("axios data:", data);
                            setOpenSuccess(true);
                            setSubmitting(false);
                        })
                        .catch((e) => {
                            setSubmitting(false);
                            console.log("axios error:", e);
                            setOpen(true);
                            if (e.message.includes("404")) {
                                setStatusCode(404);
                            } else if (e.message.includes("500")) {
                                setStatusCode(500);
                            }
                        });
                }}>
                {({
                    values,
                    submitForm,
                    resetForm,
                    isSubmitting,
                    touched,
                    errors,
                    setFieldValue,
                }) => (
                    <Form>
                        <Stack spacing={3}>
                            <Collapse in={open}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="error">
                                    {statusCode === 404
                                        ? "Email not found"
                                        : "Error while password reset"}
                                </Alert>
                            </Collapse>
                            <Collapse in={openSuccess}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpenSuccess(false);
                                            }}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="success">
                                    Send email!
                                </Alert>
                            </Collapse>
                            <Field
                                component={TextField}
                                type="email"
                                label="Email"
                                name="email"
                                fullWidth
                            />
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ my: 2 }}>
                            <Grid></Grid>
                        </Stack>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="button"
                            variant="contained"
                            onClick={submitForm}>
                            Submit
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
        </>
    );
}
