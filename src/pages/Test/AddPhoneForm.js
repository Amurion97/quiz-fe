import {Field, Form, Formik} from "formik";
import {
    Button,
    Collapse,
    Grid,
    IconButton,
    Link,
    Stack,
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {TextField} from "formik-mui";
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import axios from "axios";


export default function AddPhoneForm(props) {
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
            initialValues={{
                title: "",
                price: 0,
                description: ""
            }}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                console.log("trying to submit:", values)
                // try {
                axios.post("http://127.0.0.1:3001/products", values)
                    .then((response) => {
                        console.log("Add phone success");
                        resetForm();
                        setSubmitting(false);
                        setOpenSuccess(true);
                    })
                    .catch(e => {
                        console.log("error:", e);
                        setSubmitting(false);
                    })
            }}
            enableReinitialize={true}
        >
            {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue, handleReset}) => (

                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={3} sm={3} md={3}>
                            {/*<p>{JSON.stringify(values)}</p>*/}
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <Button href="/test">Back to home</Button>
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
                                        Add phone successfully <Link href={"/test"}>Back to home</Link>
                                    </Alert>
                                </Collapse>
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Title"
                                    name="title"
                                    fullWidth
                                />
                                <Field
                                    component={TextField}
                                    type="number"
                                    label="Price"
                                    name="price"
                                    fullWidth
                                />
                                <Field
                                    component={TextField}
                                    type="text"
                                    label="Description"
                                    name="description"
                                    fullWidth
                                />
                            </Stack>
                            <LoadingButton fullWidth size="large" type="button" variant="contained"
                                           onClick={submitForm}>
                                Save phone
                            </LoadingButton>
                        </Grid>

                    </Grid>
                </Form>
            )}
        </Formik>
    );
}