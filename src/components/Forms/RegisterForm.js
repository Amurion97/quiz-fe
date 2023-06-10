import {useState} from 'react';
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
import {useDispatch} from "react-redux";
import {TextField} from 'formik-mui';
import CloseIcon from '@mui/icons-material/Close';
import {register} from "../../features/user/userSlice";
import * as Yup from 'yup';
import {customAPIv1} from "../../features/customAPI";
// components
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .required("Required"),
    phoneNumber: Yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email()
        .required("Required"),
    password: Yup.string()
        .min(6, "Too Short!")
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    // address: Yup.string()
    //     .min(6, "Too Short!")
    //     .required("Required")
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
                    customAPIv1().post('users/',values)
                        .then(data => {
                            console.log("thunk data:", data)
                            if (data.type.includes("rejected")) {
                                setOpen(true);
                                // if (data.error.message.includes("409")) {
                                //     setStatusCode(409)
                                // } else if (data.error.message.includes("403")) {
                                //     setStatusCode(403)
                                // }
                                setSubmitting(false);
                            } else if (data.type.includes("fulfilled")) {
                                window.alert("Register Success")
                                setSubmitting(false);
                                // navigate("/login")
                            }
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
                                        {statusCode >= 409 ? "Email already exists, please reset email"
                                            : "Wrong email or password, please try again!"}
                                    </Alert>
                                </Collapse>
                                <Grid container spacing={0}>
                                    <Grid item xs={7}>
                                        <Field
                                            component={TextField}
                                            type="text"
                                            label="Name"
                                            name="name"
                                            fullWidth
                                            initialTouched={true}
                                        />
                                    </Grid>
                                    <Grid item xs={5} pl={1}>
                                        <Field
                                            component={TextField}
                                            type="number"
                                            label="Phone"
                                            name="phoneNumber"
                                            InputProps={{
                                                startAdornment: <InputAdornment
                                                    position="start">+84</InputAdornment>,
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

                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Address"
                                    name="address"
                                    fullWidth
                                />

                                <LoadingButton fullWidth size="large" type="submit"
                                               variant="contained"
                                               loading={isSubmitting}
                                    // onClick={submitForm}
                                >
                                    <span>{(isSubmitting) ? "Registering…" : "Submit"}</span>
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
