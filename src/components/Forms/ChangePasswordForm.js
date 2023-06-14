import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
    Collapse,
    IconButton,
    InputAdornment, Stack,

} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Field, Form, Formik} from "formik";
import {changePassword} from "../../features/user/userSlice";
import * as Yup from 'yup';
import {TextField} from "formik-mui";

import {customAPIv1} from "../../features/customAPI";
import CloseIcon from "@mui/icons-material/Close";

export default function ChangePasswordForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [statusCode, setStatusCode] = useState(0);
    useEffect(() => {
        if (openSuccess && countdown > 0) {
            // Giảm thời gian đếm ngược sau mỗi giây khi open là true và countdown > 0
            const timer = setInterval(() => {
                console.log("countdown", countdown)
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
            // Xóa timer khi countdown đạt giá trị 0
            return () => {
                clearInterval(timer);

            };
        } else if (openSuccess && countdown === 0) {
            localStorage.clear();
            navigate('/login');

        }
    }, [openSuccess, countdown]);

    const SchemaError = Yup.object().shape({
        password: Yup.string()
            .min(1, "Too Short!")
            .max(8, "too long")
            .required('Vui lòng nhập mật khẩu'),
        newPassword: Yup.string()
            .min(6, "Too Short!")
            .max(8, "too long")
            .required('Vui lòng nhập mật khẩu'),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
            .required('Vui lòng xác nhận mật khẩu'),

    });
    return (
        <>
            <Formik
                initialValues={{
                    password: "",
                    newPassword: "",
                    confirmNewPassword: ""

                }}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("trying to submit:", values)
                    customAPIv1().put("/users/password-change", values)
                        .then(data => {
                            console.log("axios data:", data);
                                setOpenSuccess(true);
                                setSubmitting(false);
                        })
                        .catch(e => {
                            setSubmitting(false);
                            console.log("axios error:", e)
                            setOpen(true);
                            if (e.message.includes("400")) {
                                setStatusCode(400)
                            } else if (e.message.includes("500")) {
                                setStatusCode(500)
                            }

                        })

                }}
            >
                {({handleSubmit, isSubmitting}) => (

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
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                    sx={{mb: 2}}
                                    variant="filled" severity="error"
                                >
                                    {
                                        statusCode >= 400 ? " Wrong password, please try again!" : "unknown password"
                                    }
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
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                    sx={{mb: 2}}
                                    variant="filled" severity="success"
                                >
                                    Update Password Successfully!
                                </Alert>
                            </Collapse>
                            <Field
                                component={TextField}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small"/>
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small"/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Field
                                component={TextField}
                                type={showPassword ? 'text' : 'password'}
                                label="New password"
                                name="newPassword"
                                fullWidth

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small"/>
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small"/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Field
                                component={TextField}
                                type={showPassword ? 'text' : 'password'}
                                label="Password comfirmation"
                                name="confirmNewPassword"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon fontSize="small"/>
                                                ) : (
                                                    <VisibilityOffIcon fontSize="small"/>
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
                                loading={isSubmitting}
                            >
                                <span>{(isSubmitting) ? "Registering…" : "Submit"}</span>
                            </LoadingButton>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    )
}