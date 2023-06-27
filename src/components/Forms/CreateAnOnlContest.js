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
import {useNavigate} from "react-router-dom";

export default function CreateAnOnlContest(props) {
    console.log(props)
    const navigate = useNavigate()
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
        size: Yup.number()
            .min(2, "Ít nhất 2 người")
            .max(20, "Tối đa 20 người")
            .required("Vui lòng nhập số lượng"),

    });
    return (
        <>
            <Formik
                initialValues={{
                    size: '',
                }}
                validationSchema={SchemaError}
                onSubmit={(values, {setSubmitting, setFieldValue}) => {
                    console.log("trying to submit:", values);
                    setFieldValue('size', values.size)
                    values.test = props.test.id
                    customAPIv1()
                        .post("/rooms", values)
                        .then((data) => {
                            console.log("axios data:", data);
                            setOpenSuccess(true);
                            setSubmitting(false);
                            setTimeout(() => {
                                navigate(`/dashboard/test?code=${data.data}&test=${props.test.id}`);
                            },2000)
                        })
                        .catch((e) => {
                            setSubmitting(false);
                            console.log("axios error:", e);
                            setOpen(true);
                        });
                }}>
                {({values, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>
                        {console.log(values)}
                        <Stack spacing={3} mb={3}>
                            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                <Box sx={{flex: 1}}>
                                    <Field
                                        label="Thời gian"
                                        placeholder="Minutes"
                                        type="number"
                                        name="time"
                                        value={props.test.time}
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
                                        label="Người tham gia"
                                        placeholder="People"
                                        type="number"
                                        name="size"
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
                                Tạo phòng thi
                            </LoadingButton>
                        </Stack>
                        <Stack spacing={2} sx={{width: '100%'}}>
                            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                    Tạo phòng thi Online thành công! Đang chuyển trang...
                                </Alert>
                            </Snackbar>

                            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                                    Lỗi khi tạo phòng thi Online!
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
}
