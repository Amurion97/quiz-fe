import {Field, Form, Formik} from "formik";
import {
    Button,
    Collapse,
    Grid,
    IconButton, Link,
    Stack,
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {TextField} from "formik-mui";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";


export default function EditPhoneForm() {
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [phoneInfo, setPhoneInfo] = useState({})
    const [loading, setLoading] = useState(true);
    const {state} = useLocation();
    console.log(state)
    console.log("phoneInfo:", phoneInfo)
    const {productID} = state;
    useEffect(() => {
        console.log("edit form did mount");
        axios.get(`http://127.0.0.1:3001/products/${productID}`)
            .then(res => {
                console.log("phone info:", res.data);
                setPhoneInfo(res.data);
                setLoading(false)
            })
            .catch(e => console.log("error in get phone:", e))
    }, [productID])
    return (
        <>
            {
                (!loading) &&
                <Formik
                    initialValues={{
                        title: phoneInfo.title,
                        price: phoneInfo.price,
                        description: phoneInfo.description
                    }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        console.log("trying to submit:", values)
                        // try {
                        axios.put(`http://127.0.0.1:3001/products/${productID}`, values)
                            .then((response) => {
                                console.log("Edit phone success");
                                setSubmitting(false);
                                setOpen(false);
                                setOpenSuccess(true);
                            })
                            .catch(e => {
                                console.log("error:", e);
                                setOpen(true)
                                setSubmitting(false);
                            })
                    }}
                >
                    {({values, submitForm, resetForm, isSubmitting, touched,
                          errors, setFieldValue}) => (

                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={3} sm={3} md={3}>
                                    {/*<p>{JSON.stringify(values)}</p>*/}
                                    {/*<p>{console.log("values:", JSON.stringify(values))}</p>*/}
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Button href="/test">Back to home</Button>
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
                                                Edit phone successfully <Link href={"/test"}>Back to home</Link>
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
                                        Save edited phone
                                    </LoadingButton>

                                </Grid>
                            </Grid>
                        </Form>

                    )}
                </Formik>
            }
        </>
    )

}