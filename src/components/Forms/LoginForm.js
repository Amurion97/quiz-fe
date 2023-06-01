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
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {TextField} from 'formik-mui';
import CloseIcon from '@mui/icons-material/Close';
import {login} from "../../features/user/userSlice";
// components

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    return (
        <>
            <Formik
                initialValues={{}}
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("trying to submit:", values)
                    // try {
                    dispatch(login(values))
                        .then(data => {
                            console.log("thunk data:", data)
                            if (data.type.includes("rejected")) {
                                setOpen(true)
                                setSubmitting(false);
                            } else if (data.type.includes("fulfilled")) {
                                setSubmitting(false);
                                navigate("/dashboard")
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
                                    Wrong username or password, please try again!
                                </Alert>
                            </Collapse>
                            <Field
                                component={TextField}
                                type="text"
                                label="Username"
                                name="username"
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
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                            <Grid></Grid>
                            <Link variant="subtitle2" underline="hover">
                                Forgot password?
                            </Link>
                        </Stack>

                        <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                            Login
                        </LoadingButton>
                    </Form>
                )}
            </Formik>
        </>
    )
}
