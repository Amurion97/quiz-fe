//Mui
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Paper,
    Typography,
    FormControl, Box
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import MenuItem from "@mui/material/MenuItem";
import MuiTextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//Mui Icon Button
import AlarmIcon from "@mui/icons-material/Alarm";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Component
import { customAPIv1 } from "../../../features/customAPI";
import QuestionSelection from "../../../components/Forms/Question/QuestionSelection";
import UploadImg from "../../../functions/UploandImg";
//Formik
import { Field, Form, Formik } from "formik";
//Fromik-mui
import {
    TextField, Select, Autocomplete,
} from 'formik-mui';
//Yup
import * as Yup from 'yup';


const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .required("Required"),
    time: Yup.number()
        .required("Required"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function TestCreatePage() {
    const [questionList, setQuestionList] = useState([])
    const [tags, setTags] = useState([]);
    const [diffcultyOptions, setDiffcultyOptions] = useState([]);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false)
        setOpen(false)
    };
    const addToQuestionList = (questionId) => {
        customAPIv1()
            .get(`/questions/${questionId}`)
            .then((res) => {
                console.log("data", res.data);
                const id = questionList.find((item) => item.id === res.data.data.id);
                if (id) {
                    console.log('Đã bị trùng');
                } else {
                    setQuestionList([...questionList, res.data.data]);
                }
            })
            .catch((e) => {
                console.log("error in get one question", e);
            });
    };
    const deleteQuestion = (index) => {
        const updatedQuestionList = [...questionList];
        updatedQuestionList.splice(index, 1);
        setQuestionList(updatedQuestionList);
    }


    useEffect(() => {
        customAPIv1().get("/tags")
            .then(res => {
                console.log("tags:", res.data.data);
                setTags(res.data.data.map(item => {
                    return {
                        name: item.name,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get tags:", e))

        customAPIv1().get("/difficulties")
            .then(res => {
                console.log("difficulties:", res.data.data);
                setDiffcultyOptions(res.data.data)
            })
            .catch(e => console.log("error in get difficulties:", e))
    }, [])


    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    difficulty: -1,
                    tags: [],
                    questions: [],
                    time: '',
                    image: '',
                }}
                validationSchema={SchemaError}
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    values.questions = questionList.map(item => item.id)
                    console.log("trying to submit:", values);
                    customAPIv1()
                        .post("/tests", values)
                        .then((data) => {
                            console.log("axios data:", data);
                            setOpenSuccess(true);
                            setSubmitting(false);
                            setTimeout(() => {
                                navigate('/dashboard/tests')
                            }, 3000)
                        })
                        .catch((e) => {
                            setSubmitting(false);
                            console.log("axios error:", e);
                            setOpen(true);
                        });
                }}
            >
                {({
                    values,
                    submitForm,
                    resetForm,
                    isSubmitting,
                    touched,
                    errors,
                    setFieldValue
                }) => (
                    <Form>
                        {console.log('values', values)}
                        <Grid container sx={{ p: 6, px: 2 }}>
                            <Grid item xs={2} md={2} lg={2}>
                                <Card>
                                    <UploadImg setFieldValue={setFieldValue} sx={{ height: 300 }} />
                                    <CardContent>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Field
                                                label="Tên bài thi"
                                                placeholder="Test Name"
                                                type="text"
                                                name="name"
                                                component={TextField}
                                                sx={{
                                                    mb: 3,
                                                    width: '100%',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        fontWeight: 'bolder',
                                                        fontSize: '1.5em',
                                                        textOverflow: 'ellipsis',
                                                    },
                                                }}
                                            />

                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Field
                                                        label="Thời gian"
                                                        placeholder="(phút)"
                                                        type="number"
                                                        name="time"
                                                        component={TextField}
                                                        sx={{
                                                            '& input': {
                                                                textAlign: 'center',
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CardActions disableSpacing>
                                                        <AlarmIcon sx={{ fontSize: 48, color: 'blue' }} />
                                                    </CardActions>
                                                </Box>
                                            </Box>

                                            <Box sx={{ width: '100%' }}>
                                                <FormControl fullWidth sx={{ mt: 2 }}>
                                                    <Field
                                                        component={Select}
                                                        id="difficulty"
                                                        name="difficulty"
                                                        label="Độ khó"
                                                        variant="outlined"
                                                    >
                                                        {diffcultyOptions && diffcultyOptions.map(item => (
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Field>
                                                </FormControl>
                                            </Box>

                                            <Box sx={{ width: '100%', mt: 2 }}>
                                                <Field
                                                    name="tags"
                                                    multiple
                                                    component={Autocomplete}
                                                    options={tags}
                                                    getOptionLabel={(option) => option.name}
                                                    fullWidth
                                                    renderInput={(params) => (
                                                        <MuiTextField
                                                            {...params}
                                                            name="tag"
                                                            error={touched['tag'] && !!errors['tag']}
                                                            helperText={touched['tag'] && errors['tag']}
                                                            label="Thẻ của câu hỏi"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Box>
                                    </CardContent>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            loading={isSubmitting}
                                        >
                                            Tạo bài thi
                                        </LoadingButton>
                                    </Box>
                                </Card>
                            </Grid>

                            <Grid item xs={4} sx={{ pl: "20px" }}>
                                <Paper sx={{ p: "20px" }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ display: 'flex', }}>
                                        <FormatListBulletedIcon sx={{ mr: "10px" }} /> Câu hỏi
                                    </Typography>
                                    {questionList.map((item, index) => (
                                        <Paper elevation={3} sx={{ p: "10px", mb: "20px" }}>
                                            <Grid container sx={{ pl: "20px", display: 'flex', alignItems: 'center' }}>
                                                <Grid item xs={10} sx={{ justifyContent: 'flex-start' }}>
                                                    <Typography gutterBottom variant="inherit" component="div">
                                                        Câu hỏi {index + 1}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1} sx={{ justifyContent: 'flex-end', ml: "20px", }}>
                                                    <IconButton aria-label="delete">
                                                        <DeleteForeverTwoToneIcon sx={{ color: '#f50057' }}
                                                            onClick={() => {
                                                                deleteQuestion(index)
                                                            }} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Card elevation={3}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Độ khó: {item.difficulty.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Loại câu hỏi: {item.type.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Liên quan: {tags.reduce((accumulator, currentValue) => accumulator + currentValue.name + ", ",
                                                            "",)}
                                                    </Typography>
                                                    <Typography variant="h6" component="div">
                                                        Đề bài: {item.content}
                                                    </Typography>

                                                </CardContent>
                                            </Card>
                                        </Paper>
                                    ))}
                                </Paper>
                            </Grid>


                            <Grid item xs={6}>
                                <QuestionSelection
                                    addToQuestionList={addToQuestionList}
                                />
                            </Grid>


                        </Grid>

                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Snackbar open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Tạo đề thi thành công!
                                </Alert>
                            </Snackbar>

                            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Lỗi khi tạo đề thi !
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    )
}