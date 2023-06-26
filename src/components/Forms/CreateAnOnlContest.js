import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {Alert, LoadingButton} from "@mui/lab";

import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";
import CardActions from "@mui/material/CardActions";
import AlarmIcon from "@mui/icons-material/Alarm";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import {useTheme} from "@mui/material/styles";
import {customAPIv1} from "../../features/customAPI";
import React, {useState} from "react";
import {Box} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function CreateAnOnlContest(props) {
    console.log(props.time)
    const theme = useTheme()
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
        setOpen(false)
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const SchemaError = Yup.object().shape({
        people: Yup.number()
            .min(2, "Ít nhất 2 người")
            .max(20, "Tối đa 20 người")
            .required("Vui lòng nhập số lượng"),

    });
    return (
        <>
            <Formik
                initialValues={{
                    people: ''
                }}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("trying to submit:", values);
                    customAPIv1()
                        .post("/rooms", values)
                        .then((data) => {
                            console.log("axios data:", data);
                            setOpenSuccess(true);
                            setSubmitting(false);
                        })
                        .catch((e) => {
                            setSubmitting(false);
                            console.log("axios error:", e);
                            setOpen(true);
                        });
                }}>
                {({handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack spacing={3} mb={3}>
                            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                <Box sx={{flex: 1}}>
                                    <Field
                                        label="Minutes"
                                        placeholder="Minutes"
                                        type="number"
                                        name="time"
                                        value={props.time}
                                        component={TextField}
                                        sx={{
                                            '& input': {
                                                textAlign: 'center',
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <CardActions disableSpacing>
                                        <AlarmIcon sx={{fontSize: 48, color: theme.palette.primary.main}}/>
                                    </CardActions>
                                </Box>
                            </Box>

                            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                <Box sx={{flex: 1}}>
                                    <Field
                                        label="People"
                                        placeholder="People"
                                        type="number"
                                        name="people"
                                        component={TextField}
                                        sx={{
                                            '& input': {
                                                textAlign: 'center',
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <CardActions disableSpacing>
                                        <GroupsTwoToneIcon sx={{fontSize: 48, color: theme.palette.grey["500"]}}/>
                                    </CardActions>
                                </Box>
                            </Box>


                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}>
                                Submit
                            </LoadingButton>
                        </Stack>
                        <Stack spacing={2} sx={{width: '100%'}}>
                            <Snackbar open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                    Add people success!
                                </Alert>
                            </Snackbar>

                            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                                    Error in add people!
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
}
