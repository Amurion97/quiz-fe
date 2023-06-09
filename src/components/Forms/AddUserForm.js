import {Field, Form, Formik} from "formik";
import {Collapse, IconButton, InputAdornment, Stack, TextField as TextFieldMUI} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {TextField} from "formik-mui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {customAPIv1} from "../../features/customAPI";


export default function AddUserForm(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    return (
        <Formik
            initialValues={{username: ""}}
            validate={(values) => {
                const errors = {};
                if (values.username.length < 5) {
                    errors.username = "Username too short"
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log("trying to submit:", values)
                // try {
                customAPIv1().post("/users", values)
                    .then((response)=> {
                        console.log("Add user success");
                        resetForm();
                        setSubmitting(false);
                        setOpen(false);
                        setOpenSuccess(true);
                        props.updateUsers();
                    })
                    .catch(e => {
                        console.log("error:", e);
                        setOpen(true)
                        setSubmitting(false);
                    })
            }}
        >
            {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                <Form>
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
                                Existed username
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
                                Add user successfully
                            </Alert>
                        </Collapse>
                        <Field
                            component={TextField}
                            type="text"
                            label="Name"
                            name="name"
                            fullWidth
                        />
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

                    <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                        Save user
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    );
}