import {Field, Form, Formik} from "formik";
import {
    Collapse,
    FormControl,
    IconButton,
    MenuItem,
    Stack,
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {Select, TextField} from "formik-mui";
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";


export default function AddAircraftForm(props) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [airlines, setAirlines] = useState([]);

    useEffect(() => {
        console.log("form did mount");
        customAPIv1().get("airlines")
            .then(res => {
                console.log("airlines:", res.data);
                setAirlines(res.data.data)
            })
            .catch(e => console.log("error in get airlines:", e))
    }, [])
    return (
        <Formik
            initialValues={{}}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log("trying to submit:", values)
                // try {
                customAPIv1().post("/aircraft", values)
                    .then((response)=> {
                        console.log("Add aircraft success");
                        resetForm();
                        setSubmitting(false);
                        setOpenSuccess(true);
                        props.updateAircraft();
                    })
                    .catch(e => {
                        console.log("error:", e);
                        setSubmitting(false);
                    })
            }}
        >
            {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) => (

                <Form>
                    <Stack spacing={3} mb={3}>
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
                                Add aircraft successfully
                            </Alert>
                        </Collapse>
                        <FormControl fullWidth>
                            <Field
                                component={Select}
                                type="text"
                                label="Airline"
                                name={`airline`}
                                inputProps={{
                                    name: `airline`,
                                    id: 'airline'
                                }}
                            >
                                {airlines.map(item => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Field>
                        </FormControl>
                        <Field
                            component={TextField}
                            type="text"
                            label="Name"
                            name="name"
                            fullWidth
                        />


                    </Stack>

                    <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={submitForm}>
                        Save aircraft
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    );
}