import {Field, Form, Formik} from "formik";
import {
    Collapse, FormControl,
    Grid,
    IconButton, Paper,
    Stack,
    TextField as TextFieldMUI
} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {TextField} from "formik-mui";
import {useEffect, useRef, useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import {useTheme} from "@mui/material/styles";


export default function EditFlightForm(props) {
    const theme = useTheme();
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [flightInfo, setFlightInfo] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("edit form did mount");
        customAPIv1().get(`/flights/${props.currentUser}`)
            .then(res => {
                console.log("flight info:", res.data);
                setFlightInfo(res.data.data);
                setLoading(false)
            })
            .catch(e => console.log("error in get flight:", e))
    }, [props.currentUser])
    return (
        <>
            {
                (!loading) &&
                <Formik
                    initialValues={{
                        name: flightInfo.name,
                    }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        console.log("trying to submit:", values)
                        try {
                            for (const value in values) {
                                if (value.includes("price")) {
                                    console.log(value, values[value]);
                                    let id = value.split("-")[1];
                                    customAPIv1().put(`/rows/${id}`, {
                                        price: values[value]
                                    })
                                        .catch(e => {
                                            console.log("error:", e);
                                            setOpen(true)
                                            setSubmitting(false);
                                            executeScroll();
                                        })
                                }
                            }

                            setTimeout(() => {
                                if (!open) {
                                    console.log("Edit flight success");
                                    setSubmitting(false);
                                    setOpen(false);
                                    setOpenSuccess(true);

                                    customAPIv1().get(`/flights/${props.currentUser}`)
                                        .then(res => {
                                            console.log("flight info:", res.data);
                                            setFlightInfo(res.data.data);
                                            setLoading(false)
                                        })
                                        .catch(e => console.log("error in get flight:", e))
                                }
                            }, 2000)

                        } catch (e) {
                            console.log("error:", e);
                            setOpen(true)
                            setSubmitting(false);
                            executeScroll()
                        }
                        // customAPIv1().put(`/flights/${props.currentUser}`, values)
                        //     .then((response) => {
                        //         console.log("Edit flight success");
                        //         setSubmitting(false);
                        //         setOpen(false);
                        //         setOpenSuccess(true);
                        //         props.updateUsers();
                        //     })
                        //     .catch(e => {
                        //         console.log("error:", e);
                        //         setOpen(true)
                        //         setSubmitting(false);
                        //     })
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
                                        ref={myRef}
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
                                        ref={myRef}
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
                                    disabled
                                />
                                {flightInfo.rows.map((row, index) => (
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Grid container spacing={{xs: 1, md: 2}}>
                                            <Grid item xs={2}>
                                                <Paper elevation={3} sx={{
                                                    height: "100%",
                                                    width: "100%",
                                                    textAlign: 'center',
                                                    verticalAlign: "middle",
                                                    color: theme.palette.primary.contrastText,
                                                    backgroundColor: theme.palette.primary.main,
                                                    lineHeight: '60px',

                                                }}>
                                                    {`Row ${row.name}`}
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth>
                                                    <Field
                                                        component={TextField}
                                                        type="text"
                                                        label={row.class.name}
                                                        name={`class-${index}`}
                                                        disabled
                                                    >
                                                    </Field>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth>
                                                    <Field
                                                        component={TextField}
                                                        type="number"
                                                        label=""
                                                        name={`price-${row.id}`}
                                                        defaultValue={row.price}

                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Stack>
                            <LoadingButton fullWidth size="large" type="button" variant="contained"
                                           onClick={submitForm}>
                                Save edited flight
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            }
        </>
    )

}