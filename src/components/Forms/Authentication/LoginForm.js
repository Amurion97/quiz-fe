import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
import {useDispatch} from "react-redux";
import {TextField} from 'formik-mui';
import CloseIcon from '@mui/icons-material/Close';
import {login} from "../../../features/user/userSlice";
import * as Yup from "yup";
// components
const SchemaError = Yup.object().shape({
    email: Yup.string().email()
        .required('Bạn hãy nhập email để đăng nhập'),
    password: Yup.string()
        .required('Bạn hãy nhập mật khẩu để đăng nhập'),
});
// ----------------------------------------------------------------------

export default function LoginForm({code}) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);

    return (
        <>
            <Formik
                initialValues={{}}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("trying to submit:", values)
                    // try {
                    dispatch(login(values))
                        .then(data => {
                            console.log("thunk data:", data)
                            if (data.type.includes("rejected")) {
                                setOpen(true);
                                if (data.error.message.includes("401")) {
                                    setStatusCode(401)
                                } else if (data.error.message.includes("403")) {
                                    setStatusCode(403)
                                }
                                setSubmitting(false);
                            } else if (data.type.includes("fulfilled")) {
                                let role = data.payload.info.role;
                                console.log("role", role)
                                setSubmitting(false);
                                if (role === 1)
                                    navigate("/dashboard/users")
                                else if (role === 2)
                                    navigate("/dashboard/tests")
                                else {
                                    if (code) {
                                        navigate(`/students/quizSearch?code=${code}`)
                                    } else {
                                        navigate("/students")
                                    }
                                }

                            }

                        })
                }}
            >
                {({
                      values,
                      submitForm,
                      resetForm,
                      isSubmitting,
                      touched,
                      errors,
                      setFieldValue
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
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                    sx={{mb: 2}}
                                    variant="filled" severity="error"
                                >
                                    {statusCode >= 403 ? "Tài khoản bị khóa, vui lòng liên hệ với quản trị viên"
                                        : "Email hoặc mật khẩu sai, vui lòng thử lại!"}
                                </Alert>
                            </Collapse>
                            <Field
                                component={TextField}
                                type="email"
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
                                onChange={(e) => {
                                    setFieldValue("password", e.target.value)
                                }}
                            />
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between"
                               sx={{my: 2}}>
                            <Grid></Grid>
                            <Link to="/forgot-password">
                                Bạn quên mật khẩu?
                            </Link>
                        </Stack>

                        <LoadingButton fullWidth size="large" type="button" variant="contained"
                                       onClick={submitForm}>
                            Đăng nhập
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
        </>
    )
}
