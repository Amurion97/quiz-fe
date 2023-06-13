import {Field, Form, Formik} from "formik";
import {Collapse, FormControlLabel, IconButton, InputAdornment, Stack, TextField as TextFieldMUI} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {Switch, TextField} from "formik-mui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";


export default function EditUserForm(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true);
    console.log('props.currentUser  ', props.currentUser);
    useEffect(() => {
        console.log("edit form did mount");
        customAPIv1().get(`/users/${props.currentUser}`)
            .then(res => {
                console.log("userInfo:", res.data);
                setUserInfo(res.data.data);
                setLoading(false)
            })
            .catch(e => console.log("error in get users:", e))
    }, [props.currentUser])
    return (
        <>
            {
                (!loading) &&
                <Formik
                    initialValues={{
                        name: userInfo.name,
                        username: userInfo.username,
                        isLocked: userInfo.isLocked
                    }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        console.log("trying to submit:", values)
                        // try {
                        customAPIv1().put(`/users/${props.currentUser}`, values)
                            .then((response) => {
                                console.log("Edit user success");
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
                                {/*<p>{JSON.stringify(values)}</p>*/}
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
                                        Edit user successfully
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
                                    label="New Password"
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
                            <FormControlLabel
                                control={
                                    <Field component={Switch} type="checkbox" name="isLocked"/>
                                }
                                label="Locked"
                            />
                            <LoadingButton fullWidth size="large" type="button" variant="contained"
                                           onClick={submitForm}>
                                Save edited user
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            }
        </>
    )

}