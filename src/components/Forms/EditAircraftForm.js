import {Field, Form, Formik} from "formik";
import {Collapse, FormControlLabel, IconButton, InputAdornment, Stack, TextField as TextFieldMUI} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {Switch, TextField} from "formik-mui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";


export default function EditAircraftForm(props) {
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [aircraftInfo, setAircraftInfo] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("edit form did mount");
        customAPIv1().get(`/aircraft/${props.currentUser}`)
            .then(res => {
                console.log("aircraft info:", res.data);
                setAircraftInfo(res.data.data);
                setLoading(false)
            })
            .catch(e => console.log("error in get aircraft:", e))
    }, [props.currentUser])
    return (
        <>
            {
                (!loading) &&
                <Formik
                    initialValues={{
                        name: aircraftInfo.name,
                    }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        console.log("trying to submit:", values)
                        // try {
                        customAPIv1().put(`/aircraft/${props.currentUser}`, values)
                            .then((response) => {
                                console.log("Edit aircraft success");
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
                                        Error occured, please try again
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
                                        Edit aircraft successfully
                                    </Alert>
                                </Collapse>
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Name"
                                    name="name"
                                    fullWidth
                                />
                            </Stack>
                            <LoadingButton fullWidth size="large" type="button" variant="contained"
                                           onClick={submitForm}>
                                Save edited aircraft
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            }
        </>
    )

}