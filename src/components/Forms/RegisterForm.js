import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {
    Stack,
    IconButton,
    InputAdornment,
    Grid,
    Collapse
} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Field, Form, Formik} from "formik";
import {TextField} from 'formik-mui';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import {customAPIv1} from "../../features/customAPI";
import GoogleLoginButton from '../Google/GoogleLogin';
// components

const SchemaError = Yup.object().shape({
    email: Yup.string().email()
        .required('Please enter your email'),
    password: Yup.string()
        .min(6, 'Password must be 6 - 8 characters')
        .max(8,'Password must be 6 - 8 characters')
        .required('Please enter a password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password mismatch')
        .required('Please confirm your password'),
});

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const [openSuccess, setOpenSuccess] = useState(false);
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        if (openSuccess && countdown > 0) {
            // Giảm thời gian đếm ngược sau mỗi giây khi openSuccess là true và countdown > 0
            const timer = setInterval(() => {
                console.log("countdown",countdown)
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
            // Xóa timer khi countdown đạt giá trị 0
            return () => {
                clearInterval(timer);

            };
        }else if (openSuccess && countdown === 0) {
            navigate('/login')
        }
    }, [openSuccess, countdown]);


    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("trying to submit:", values)
                    customAPIv1().post('users/', values)
                        .then(data => {
                            console.log("thunk data:", data)
                            setOpen(false);
                            setOpenSuccess(true);
                            setSubmitting(false);
                        })
                        .catch(error => {
                            setOpen(true);
                            if (error.message.includes("409")) {
                                setStatusCode(409);
                            } else {
                                console.log("Error:", error);
                            }
                            setSubmitting(false);
                        });
                }}
            >
                {({
                      isSubmitting,
                  }) => {
                    return (
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
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit"/>
                                            </IconButton>
                                        }
                                        sx={{mb: 2}}
                                        variant="filled" severity="error"
                                    >
                                        {statusCode === 409 ?
                                            "Email already exists, please use another email or" +
                                            " Reset password"
                                            :
                                            "Server error during registration, please try again"
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
                                        Register Success!
                                        Redirecting to login page in {countdown} seconds...
                                    </Alert>
                                </Collapse>

                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Email"
                                    name="email"
                                    fullWidth
                                />

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
                                                    edge="end">
                                                    {showPassword ? (
                                                        <VisibilityIcon fontSize="small"/>) : (
                                                        <VisibilityOffIcon fontSize="small"/>)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Field
                                    component={TextField}
                                    type={showPassword ? 'text' : 'password'}
                                    label="Re-enter the password"
                                    name="confirmPassword"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end">
                                                    {showPassword ? (
                                                        <VisibilityIcon fontSize="small"/>) : (
                                                        <VisibilityOffIcon fontSize="small"/>)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <LoadingButton fullWidth size="large" type="submit"
                                               variant="contained"
                                               loading={isSubmitting}
                                >
                                    <span>{(isSubmitting) ? "Registering…" : "Submit"}</span>
                                </LoadingButton>
                            </Stack>
                            <GoogleLoginButton></GoogleLoginButton>

                        </Form>
                    )
                }
                }
            </Formik>
        </>
    )
}
