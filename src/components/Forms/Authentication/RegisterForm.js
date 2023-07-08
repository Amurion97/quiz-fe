import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {
    Stack,
    IconButton,
    InputAdornment,
    Collapse
} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Field, Form, Formik} from "formik";
import {TextField} from 'formik-mui';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import {customAPIv1} from "../../../features/customAPI";
// components

const SchemaError = Yup.object().shape({
    email: Yup.string().email()
        .required('Bạn hãy nhập email để đăng ký'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải từ 6-8 ký tự')
        .max(8, 'Mật khẩu phải từ 6-8 ký tự')
        .required('Bạn hãy nhập mật khẩu để đăng ký'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
        .required('Bạn phải xác nhận lại mật khẩu'),
});

// ----------------------------------------------------------------------

export default function RegisterForm({code}) {
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
                console.log("countdown", countdown)
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
            // Xóa timer khi countdown đạt giá trị 0
            return () => {
                clearInterval(timer);

            };
        } else if (openSuccess && countdown === 0) {
            navigate('/login', {
                state: {
                    code: code
                }
            })
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
                                        "Đã có tài khoản sử dụng email này, bạn hãy dùng một email khác"
                                        :
                                        "Lỗi máy chủ trong quá trình đăng ký, vui lòng thử lại"
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
                                    Đăng ký thành công
                                    Bạn sẽ được trở lại trăng đăng nhập trong {countdown} giây...
                                </Alert>
                            </Collapse>

                            <Stack spacing={3}>


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
                                    label="Mật khẩu"
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
                                    label="Nhập lại mật khẩu"
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
                                    <span>{(isSubmitting) ? "Đang đăng ký" : "Đăng ký"}</span>
                                </LoadingButton>
                            </Stack>

                        </Form>
                    )
                }
                }
            </Formik>
        </>
    )
}
