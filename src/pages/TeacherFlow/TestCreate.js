import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Input,
    Paper,
    Typography,
    Autocomplete,
    TextField, FormControl, InputLabel, Select, Button
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import AlarmIcon from "@mui/icons-material/Alarm";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, {useEffect, useState} from "react";
import QuestionCreateManagement from "./addQuetions/QuestionCreateManagement";
import {customAPIv1} from "../../features/customAPI";
import UploadImg from "../../functions/UploandImg";
import MenuItem from "@mui/material/MenuItem";
import {Field, Form, Formik} from "formik";
import MuiTextField from "@mui/material/TextField";

export default function TestCreatePage() {
    const [nameTest, setNameTest] = useState('');
    const [minutes, setMinutes] = useState('');
    const [questionList, setQuestionList] = useState([])
    const [tags, setTags] = useState([]);
    const [diffcultyOptions, setDiffcultyOptions] = useState([]);

    const handleInputChange = (event) => {
        setNameTest(event.target.value);
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


    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    };

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
    const addTest = (values) => {
        console.log('dataAdd', values)
        customAPIv1().post('/tests', values)
            .then(res => {
                console.log('Add test success!')
            }).catch(e => {
            console.log('error in add test', e)
        })
    }


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
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={addTest}
                enableReinitialize={true}
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
                        {console.log('values',values)}
                        <Grid container sx={{p: 10}}>
                            <Grid item xs={2}>
                                <Card>
                                    <UploadImg/>
                                    <CardContent>
                                        <Input
                                            label="Search Here"
                                            placeholder="Test Name"
                                            name="nameTest"
                                            value={nameTest}
                                            onChange={handleInputChange}
                                            sx={{
                                                ml: 3,
                                                flex: 1,
                                                width: 200,
                                                '& input': {
                                                    textAlign: 'center',
                                                    fontWeight: 'bolder',
                                                    fontSize: '1.5em',
                                                    textOverflow: 'ellipsis',
                                                },
                                            }}
                                        />
                                        <Grid container>
                                            <Grid item xs={8} sx={{pt: "24px",}} textAlign={"center"}>
                                                <TextField
                                                    sx={{
                                                        '& input': {
                                                            textAlign: 'center'
                                                        }
                                                    }}
                                                    placeholder={"0"}
                                                    label="Minutes"
                                                    type="number"
                                                    value={minutes}
                                                    onChange={handleMinutesChange}
                                                />
                                                <Typography>
                                                    Time/ques
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center',}}>
                                                <CardActions disableSpacing>
                                                    <AlarmIcon
                                                        sx={{fontSize: 48, color: "blue"}}/>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Paper sx={{
                                                p: 1,
                                                pt: 2,
                                            }}>
                                                <FormControl fullWidth>
                                                    <Field
                                                        component={Select}
                                                        id="difficulty"
                                                        name="difficulty"
                                                        labelId="difficulty"
                                                        label="Difficulty"
                                                    >

                                                        {diffcultyOptions.map(item => (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                    </Field>
                                                </FormControl>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Paper sx={{
                                                p: 1,
                                                pt: 2,
                                            }}>
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
                                                            label="Tags"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                />
                                            </Paper>
                                        </Grid>
                                    </CardContent>

                                </Card>
                                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Field
                                        as={Button}
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        type="submit"
                                    >
                                        Submit
                                    </Field>
                                </Grid>


                            </Grid>
                            <Grid item xs={4} sx={{pl: "20px"}}>
                                <Paper sx={{p: "20px"}}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex',}}>
                                        <FormatListBulletedIcon sx={{mr: "10px"}}/> Questions
                                    </Typography>
                                    {questionList.map((item, index) => (
                                        <Paper elevation={3} sx={{p: "10px", mb: "20px"}}>
                                            <Grid container sx={{pl: "20px", display: 'flex', alignItems: 'center'}}>
                                                <Grid item xs={10} sx={{justifyContent: 'flex-start'}}>
                                                    <Typography gutterBottom variant="inherit" component="div">
                                                        Question {index + 1}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1} sx={{justifyContent: 'flex-end', ml: "20px",}}>
                                                    <IconButton aria-label="delete">
                                                        <DeleteForeverTwoToneIcon sx={{color: '#E33F5E'}}
                                                                                  onClick={() => {
                                                                                      deleteQuestion(index)
                                                                                  }}/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Card elevation={3}>
                                                <CardContent>
                                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                        Độ khó: {item.difficulty.name}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                        Dạng câu hỏi: {item.type.name}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                        Liên
                                                        quan: {tags.reduce((accumulator, currentValue) => accumulator + currentValue.name + ", ",
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
                                <QuestionCreateManagement
                                    addToQuestionList={addToQuestionList}
                                />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    )
}