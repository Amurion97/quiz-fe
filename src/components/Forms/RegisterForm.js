import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {
    Link,
    Stack,
    IconButton,
    InputAdornment,
    TextField as TextFieldMUI,
    Grid,
    Collapse
} from '@mui/material';
import {Alert, LoadingButton} from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {TextField} from 'formik-mui';
import CloseIcon from '@mui/icons-material/Close';
import {register} from "../../features/user/userSlice";
import * as Yup from 'yup';
// components
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .required("Required"),
    phoneNumber:Yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email()
        .required("Required"),
    password: Yup.string()
        .min(6, "Too Short!")
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword:Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    address: Yup.string()
        .min(6, "Too Short!")
        .required("Required")
});

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);

    return (
        <>
            <Formik
                initialValues={{}}
                validate={(values) => {
                    const errors = {};
                    if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = "Mật khẩu không trùng khớp";
                    }
                    return errors;
                }}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("trying to submit:", values)
                    window.alert("Register Success")
                    // try {
                    dispatch(register(values))
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
                                setSubmitting(false);
                                navigate("/login")
                            }

                        })
                }}
            >
                {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

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
                                    {statusCode >= 403 ? "Account is locked, please contact admin"
                                        : "Wrong email or password, please try again!"}
                                </Alert>
                            </Collapse>
                            {console.log(values)}
                            <Grid container spacing={2}>
                                <Grid xs={7}>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        label="Name"
                                        name="name"
                                        fullWidth
                                    />

                                </Grid>
                                <Grid xs={5}>
                                    <Field
                                        component={TextField}
                                        type="number"
                                        label="Phone"
                                        name="phoneNumber"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+84</InputAdornment>,
                                        }}
                                        fullWidth
                                    />

                                </Grid>
                            </Grid>
                            <Field
                                component={TextField}
                                type="text"
                                label="Email"
                                name="email"
                                fullWidth
                            />

                            <Field
                                component={TextFieldMUI}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? (<VisibilityIcon fontSize="small"/>) : (
                                                    <VisibilityOffIcon fontSize="small"/>)}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setFieldValue("password", e.target.value)
                                }}
                            />
                            <p style={{color: 'red'}}><ErrorMessage name={'password'}/></p>
                            <Field
                                component={TextFieldMUI}
                                type={showPassword ? 'text' : 'password'}
                                label="Re-enter the password"
                                name="confirmPassword"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? (<VisibilityIcon fontSize="small"/>) : (
                                                    <VisibilityOffIcon fontSize="small"/>)}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setFieldValue("confirmPassword", e.target.value)
                                }}
                            />
                            <p style={{color: 'red'}}><ErrorMessage name={'confirmPassword'}/></p>

                            <Field
                                component={TextField}
                                type="text"
                                label="Address"
                                name="address"
                                fullWidth
                            />

                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                            <Grid></Grid>
                            {/*<Link variant="subtitle2" underline="hover">*/}
                            {/*    Forgot password?*/}
                            {/*</Link>*/}
                        </Stack>

                        <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                            Submit
                        </LoadingButton>
                    </Form>
                )}

            </Formik>
        </>
    )
}
