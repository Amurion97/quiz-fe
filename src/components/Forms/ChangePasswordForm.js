import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Collapse, IconButton, InputAdornment, Snackbar, Stack } from "@mui/material";
import { Alert, LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Field, Form, Formik } from "formik";
import { changePassword } from "../../features/user/userSlice";
import * as Yup from "yup";
import { TextField } from "formik-mui";

import { customAPIv1 } from "../../features/customAPI";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

export default function ChangePasswordForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const SchemaError = Yup.object().shape({
        password: Yup.string()
            .min(1, "Quá ngắn!")
            .max(8, "Quá dài!")
            .required("Vui lòng nhập mật khẩu"),
        newPassword: Yup.string()
            .min(6, "Quá ngắn!")
            .max(8, "Quá dài!")
            .required("Vui lòng nhập mật khẩu"),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
            .required("Vui lòng xác nhận mật khẩu"),
    });
    return (
        <>
            <Formik
                initialValues={{
                    password: "",
                    newPassword: "",
                    confirmNewPassword: "",
                }}
                validate={(values) => {
                    setOpen(false);
                    const errors = {};
                    return errors;
                }}
                validationSchema={SchemaError}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("trying to submit:", values);
                    customAPIv1()
                        .put("/users/password-change", values)
                        .then((data) => {
                            console.log("axios data:", data);
                            setOpenSuccess(true);
                            setSubmitting(false);
                            setTimeout(()=>{
                                        navigate('/login')
                                    },2000)
                        })
                        .catch((e) => {
                            setSubmitting(false);
                            console.log("axios error:", e);
                            setOpen(true);
                            if (e.message.includes("400")) {
                                setStatusCode(400);
                            } else if (e.message.includes("500")) {
                                setStatusCode(500);
                            }
                        });
                }}>
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
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
                                            }}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    variant="filled"
                                    severity="error">
                                    {statusCode >= 400
                                        ? " Mật khẩu sai, vui lòng thử lại!"
                                        : "mật khẩu sai"}
                                </Alert>
                            </Collapse>
                            <Field
                                component={TextField}
                                type={showPassword ? "text" : "password"}
                                label="Mật khẩu cũ"
                                name="password"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end">
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Field
                                component={TextField}
                                type={showPassword ? "text" : "password"}
                                label="Mật khẩu mới"
                                name="newPassword"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end">
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Field
                                component={TextField}
                                type={showPassword ? "text" : "password"}
                                label="Nhập lại mật khẩu mới"
                                name="confirmNewPassword"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                edge="end">
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}>
                                <span>
                                    {isSubmitting ? "Đăng đăng ký..." : "Đăng ký"}
                                </span>
                            </LoadingButton>
                        </Stack>
                        <Stack spacing={2} sx={{width: '100%'}}>
                            <Snackbar open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                    Thay đổi mật khẩu thành công!

                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
}
