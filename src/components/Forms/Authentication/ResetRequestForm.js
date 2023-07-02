import { useState } from "react";
// @mui
import {
    Stack,
    IconButton,
    Grid,
    Collapse,
} from "@mui/material";
import { Alert, LoadingButton } from "@mui/lab";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import CloseIcon from "@mui/icons-material/Close";
import { customAPIv1 } from "../../../features/customAPI";

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
                                        ? "Không tìm thấy email"
                                        : "Có lỗi xảy ra, vui lòng thử lại"}
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
                                    Email đặt lại mật khẩu đã được gửi đi, vui lòng kiểm tra hộp thư của bạn!
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
