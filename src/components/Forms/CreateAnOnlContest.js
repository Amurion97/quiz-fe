import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Box, Collapse, IconButton, Stack} from "@mui/material";
import {Alert, LoadingButton} from "@mui/lab";

import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";

import {customAPIv1} from "../../features/customAPI";
import CloseIcon from "@mui/icons-material/Close";
import CardActions from "@mui/material/CardActions";
import AlarmIcon from "@mui/icons-material/Alarm";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import {useTheme} from "@mui/material/styles";

export default function CreateAnOnlContest(props) {
    console.log(props.time)
    const theme = useTheme()


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
                    number: '',
                    people: ''
                }}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting}) => {
                    // console.log("trying to submit:", values);
                    // customAPIv1()
                    //     .put("/users/password-change", values)
                    //     .then((data) => {
                    //         console.log("axios data:", data);
                    //         // setOpenSuccess(true);
                    //         setSubmitting(false);
                    //     })
                    //     .catch((e) => {
                    //         setSubmitting(false);
                    //         console.log("axios error:", e);
                    //         // setOpen(true);
                    //         if (e.message.includes("400")) {
                    //             setStatusCode(400);
                    //         } else if (e.message.includes("500")) {
                    //             setStatusCode(500);
                    //         }
                    //     });
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
                    </Form>
                )}
            </Formik>
        </>
    );
}
