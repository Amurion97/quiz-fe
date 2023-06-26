import {useEffect, useState} from 'react';
// @mui
import {
    Grid,
    IconButton,
    CardHeader,
    Card,
    CardContent,
    Radio,
    FormControlLabel,
    Typography,
    FormControl,
    Paper, Button
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {alpha, styled, useTheme} from "@mui/material/styles";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Slide from '@mui/material/Slide';
import Checkbox from '@mui/material/Checkbox';
import MuiTextField from '@mui/material/TextField';

// formik
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import {
    TextField, RadioGroup, Select, Autocomplete,
    // ToggleButtonGroup
} from 'formik-mui';

// functions
import {customAPIv1} from "../../../features/customAPI";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useNavigate} from "react-router-dom";

// components
const StyleForm = styled(Grid)(({theme}) => ({
    width: "100%",
    // backgroundColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.light,
    // backgroundColor: theme.palette.secondary.main,
    // backgroundColor: theme.palette.background.paper,
    padding: "15px 25px 25px",
    borderRadius: theme.shape.borderRadius,
}));
const validationSchema = yup.object({
    content: yup
        .string('Enter your email')
        .required('Question content must not be blank'),
    // password: yup
    //     .string('Enter your password')
    //     .min(8, 'Password should be of minimum 8 characters length')
    //     .required('Password is required'),
});
const BG_COLOR = ['#2BA687', '#1976D2', '#F0A001', '#F200BE', '#CD1E3F'];
const BORDER_COLOR = ['#155142', '#042164', '#9A6601', '#9B007A', '#850E24']
const FOCUS_COLOR = ['#1E745F', '#0C4497', '#C08001', '#C20098', '#A61732']
// ----------------------------------------------------------------------

export default function QuestionEditForm({question, tags}) {
    console.log("question edit form rendering:", question)
    const navigate = useNavigate()
    const theme = useTheme();
    const [trueIndexes, setTrueIndexes] = useState(question.answers
        .map((item, index) => item.isTrue ? index : null)
        .filter(item => item !== null))
    ;
    const [message, setMessage] = useState("");
    const [difficultyOptions, setDifficultyOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    const preAnswers = {}
    question.answers.forEach((item, index) => {
        preAnswers[`answer-${index}`] = item.content
    });

    const handleTrueIndexes = (newAnswerIndex, setFieldValue) => {
        console.log("trueIndexes pre-process", trueIndexes)
        let index = trueIndexes.findIndex(item => item === newAnswerIndex);
        if (index < 0) {
            setTrueIndexes([...trueIndexes, newAnswerIndex]);
            return [...trueIndexes, newAnswerIndex];
        } else {
            trueIndexes.splice(index, 1);

            setTrueIndexes([...trueIndexes])
            return [...trueIndexes];
        }

    }

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const handleCloseSuccessDialog = () => {
        setOpenSuccessDialog(false);
    };

    const [answerNumber, setAnswerNumber] = useState(question.answers.length);
    const addOneAnswer = () => {
        setAnswerNumber((prevState) => prevState + 1)
    }
    const removeOneAnswer = (values, setFieldValue, index) => {
        // console.log(values, index)
        for (let i = index; i < answerNumber; i++) {
            setFieldValue(`answer-${i}`, values[`answer-${i + 1}`]);
            // console.log(values)
        }
        setFieldValue(`deleteIndex`, index);
        setAnswerNumber(answerNumber - 1);
        setTimeout(() => {
            // setAnswerNumber(currentNumber - 1);
            setFieldValue(`deleteIndex`, undefined);
        }, 300)

    }

    useEffect(() => {
        console.log("form did mount");
        customAPIv1().get("/types")
            .then(res => {
                console.log("types:", res.data.data);
                setTypeOptions(res.data.data)
            })
            .catch(e => console.log("error in get types:", e))

        customAPIv1().get("/difficulties")
            .then(res => {
                console.log("difficulties:", res.data.data);
                setDifficultyOptions(res.data.data)
            })
            .catch(e => console.log("error in get difficulties:", e))
    }, [])


    const formSubmition = (values, {setSubmitting}) => {
        console.log("trying to submit:", values);
        let error = false;
        let answers = [];
        values.trueIndex = parseInt(values.trueIndex);
        values.type = parseInt(values.type);
        values.difficulty = parseInt(values.difficulty);

        if (values.content === "") {
            setMessage("Question content must not be blank");
            setOpenDialog(true)
            error = true;
        } else if (values.type === 3 && trueIndexes.length < 2) {
            setMessage("Please select at least 2 answers");
            setOpenDialog(true)
            error = true;
        } else if (values.type < 3 && values.trueIndex < 0) {
            setMessage("Please select 1 answers");
            setOpenDialog(true)
            error = true;
        } else if (isNaN(values.difficulty)) {
            setMessage("Please choose difficulty for the question");
            setOpenDialog(true)
            error = true;
        } else {
            if (values.type === 1) {
                answers = [
                    {
                        content: "True",
                        isTrue: values.trueIndex === 0
                    },
                    {
                        content: "False",
                        isTrue: values.trueIndex === 1
                    }
                ]
            } else {
                for (let i = 0; i < answerNumber; i++) {
                    if (values[`answer-${i}`] === "" || values[`answer-${i}`] === undefined) {
                        setMessage("Please fill in or delete empty answers ");
                        setOpenDialog(true)
                        error = true;
                    }
                    answers.push({
                        content: values[`answer-${i}`],
                        isTrue: values.type <= 2 ? values.trueIndex === i : trueIndexes.includes(i)
                    })
                }
            }
            values.answers = answers;
        }

        console.log("processed values:", values);
        if (!error) {
            try {
                customAPIv1().put(`/questions/${question.id}`, values)
                    .then(() => {
                        setSubmitting(false);
                        setOpenSuccessDialog(true);
                        setTimeout(() => {
                            navigate('/dashboard/questions')
                        }, 3000)
                    })
                    .catch(e => {
                        console.log("error in save question:", e);
                        setMessage("Failed, try again");
                        setOpenDialog(true)
                        setSubmitting(false)
                    })
            } catch (e) {
                console.log("error in save question:", e);
                setMessage("Failed, try again");
                setOpenDialog(true)
                setSubmitting(false)
            }
        } else {
            setSubmitting(false);
        }

    }
    const tagsDefault = tags.filter(item => {
        // console.log(item)
        let check = question.tags.some(tag => {
            // console.log("item id:", item.id, "tag id:", tag.id)
            return tag.id === item.id
        })
        // console.log("item id:", item.id, check)
        return check;
    });
    console.log(tagsDefault)
    return (
        <>
            <Formik
                initialValues={
                    {
                        trueIndex: question.answers.findIndex(item => item.isTrue),
                        type: question.type.id,
                        content: question.content,
                        // tags: question.tags,
                        // tags: [tags[1]],
                        tags: tagsDefault,
                        difficulty: question.difficulty.id,
                        trueIndexes: trueIndexes,
                        ...preAnswers,
                    }
                    // question
                }
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                // validationSchema={validationSchema}
                onSubmit={formSubmition}
                // enableReinitialize={true}
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
                        <StyleForm container spacing={1}>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    // label="Flight name"
                                    name="content"
                                    sx={{
                                        border: `5px solid ${theme.palette.primary.main}`,
                                        borderRadius: `${theme.shape.borderRadius + 2}px`,
                                        // height: "300px",
                                        // '& .MuiOutlinedInput-root': {
                                        //     backgroundColor: theme.palette.primary.contrastText,
                                        //     // height: "2.5rem",
                                        //     color: theme.palette.primary.main,
                                        // }
                                        "& .MuiFilledInput-root": {
                                            // bgcolor: 'secondary.darker',
                                            // bgcolor: 'primary.lighter',
                                            // bgcolor: 'primary.main',
                                            // bgcolor: 'secondary.main',
                                            bgcolor: 'inherit',
                                            textAlign: 'center',
                                            borderRadius: "8px",
                                            borderWidth: '10px',
                                            borderColor: 'red',
                                            color: 'primary.lighter',
                                            '&:hover': {
                                                bgcolor: 'primary.dark',
                                                color: 'primary.contrastText',
                                            },
                                            '&.Mui-focused': {
                                                borderColor: 'red',
                                                borderWidth: '10px',
                                                bgcolor: 'primary.darker',
                                                color: 'primary.contrastText',
                                            },
                                            '& .MuiFilledInput-input::placeholder': {
                                                color: "primary.contrastText",
                                            },
                                        },
                                        "& .MuiFilledInput-input": {
                                            textAlign: 'center',
                                            verticalAlign: 'center',
                                            fontSize: '2rem',
                                            lineHeight: '2rem',
                                            alignSelf: 'center',
                                        },

                                    }}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    variant="filled"
                                    placeholder={"Nhập câu hỏi của bạn vào đây..."}
                                />
                            </Grid>

                            {/*<Grid item xs={12}>*/}
                            {/*    <p>{JSON.stringify(values)}</p>*/}
                            {/*    <p>id: {question.id}</p>*/}
                            {/*</Grid>*/}

                            <Grid item xs={12}>
                                <Field component={RadioGroup} name={'trueIndex'}>

                                    <Grid container spacing={{xs: 0.5, md: 1}}
                                          columns={{xs: (parseInt(values.type) === 1) ? 12 : 13}}>

                                        {parseInt(values.type) === 1 && (
                                            <>
                                                <Grid item xs={6} sm={6} md={6}>
                                                    <Card sx={{
                                                        boxShadow: `0 8px ${theme.palette.primary.main}`,
                                                        mb: 1,
                                                        bgcolor: BG_COLOR[0],
                                                    }}
                                                    >
                                                        <CardHeader
                                                            avatar={
                                                                // <IconButton aria-label="settings"
                                                                //             color={"error"}
                                                                //             {...((answerNumber <= 2) && {disabled: true})}>
                                                                //     <DeleteOutlineIcon/>
                                                                // </IconButton>
                                                                <></>
                                                            }
                                                            action={
                                                                // <FormControlLabel
                                                                //     value={0}
                                                                //     control={<Radio
                                                                //         disabled={isSubmitting}/>}
                                                                //     label=""
                                                                //     disabled={isSubmitting}
                                                                //     icon={<FavoriteBorder/>}
                                                                //     checkedIcon={
                                                                //         <Favorite/>}
                                                                // />
                                                                <Paper sx={{
                                                                    borderRadius: '50%',
                                                                    aspectRatio: "1/1",
                                                                    mr: 1,
                                                                    mt: 0.5,
                                                                }}>

                                                                    <FormControlLabel
                                                                        value={0}
                                                                        control={
                                                                            <Radio
                                                                                disabled={isSubmitting}/>}
                                                                        label=""
                                                                        labelPlacement={'end'}
                                                                        disabled={isSubmitting}
                                                                        size={"large"}
                                                                        sx={{
                                                                            m: 0
                                                                        }}
                                                                    />
                                                                </Paper>
                                                            }
                                                            title=""
                                                            subheader=""
                                                            sx={{
                                                                p: 1,
                                                                pt: 0.5,
                                                            }}
                                                        />
                                                        <CardContent sx={{
                                                            textAlign: 'center',
                                                            verticalAlign: 'center',
                                                            pt: 0,
                                                        }}>
                                                            <Typography variant={'h4'}
                                                                        sx={{
                                                                            mb: 4
                                                                        }}>
                                                                True
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6}>
                                                    <Card sx={{
                                                        boxShadow: `0 8px ${theme.palette.primary.main}`,
                                                        mb: 1,
                                                        bgcolor: BG_COLOR[4],
                                                    }}
                                                    >
                                                        <CardHeader
                                                            avatar={
                                                                <></>
                                                            }
                                                            action={
                                                                <Paper sx={{
                                                                    borderRadius: '50%',
                                                                    aspectRatio: "1/1",
                                                                    mr: 1,
                                                                    mt: 0.5,
                                                                }}>

                                                                    <FormControlLabel
                                                                        value={1}
                                                                        control={
                                                                            <Radio
                                                                                disabled={isSubmitting}/>}
                                                                        label=""
                                                                        labelPlacement={'end'}
                                                                        disabled={isSubmitting}
                                                                        size={"large"}
                                                                        sx={{
                                                                            m: 0
                                                                        }}
                                                                    />
                                                                </Paper>
                                                            }
                                                            title=""
                                                            subheader=""
                                                            sx={{
                                                                p: 1,
                                                                pt: 0.5,
                                                            }}
                                                        />
                                                        <CardContent sx={{
                                                            textAlign: 'center',
                                                            verticalAlign: 'center',
                                                            pt: 0,
                                                        }}>
                                                            <Typography variant={'h4'}
                                                                        sx={{
                                                                            mb: 4
                                                                        }}>
                                                                False
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </>
                                        )}

                                        {parseInt(values.type) >= 2
                                            && (<>
                                                {[...Array(answerNumber)].map((x, index) =>
                                                    <Slide direction="left" in={true}
                                                           mountOnEnter
                                                           unmountOnExit>
                                                        <Grid
                                                            key={(index > values['deleteIndex']) ? 10 - index : index}
                                                            item
                                                            xs={12 / answerNumber}
                                                            // sm={6} md={6}
                                                        >
                                                            <Card sx={{
                                                                boxShadow: `5px 8px ${alpha('#595959', 0.4)}`,
                                                                mb: 1,
                                                                bgcolor: BG_COLOR[index],
                                                            }}
                                                            >
                                                                <CardHeader
                                                                    avatar={
                                                                        <Paper sx={{
                                                                            // borderRadius: "50%",
                                                                        }}>
                                                                            <IconButton
                                                                                aria-label="settings"
                                                                                color={"error"}
                                                                                {...((answerNumber <= 2) && {disabled: true})}
                                                                                onClick={() => {
                                                                                    removeOneAnswer(values, setFieldValue, index)
                                                                                }}
                                                                            >
                                                                                <DeleteOutlineIcon/>
                                                                            </IconButton>
                                                                        </Paper>
                                                                    }
                                                                    action={
                                                                        <Paper sx={{
                                                                            borderRadius: `${parseInt(values.type) === 2 ? "50%" : theme.shape.borderRadius}`,
                                                                            // width: '80%',
                                                                            aspectRatio: "1/1",
                                                                            // pl: 1.25,
                                                                            // pr: -0.5,
                                                                            // pt: 0.5,
                                                                            mr: 1,
                                                                            mt: 0.5,
                                                                        }}>
                                                                            {parseInt(values.type) === 2 ?
                                                                                <FormControlLabel
                                                                                    value={index}
                                                                                    control={
                                                                                        <Radio
                                                                                            disabled={isSubmitting}/>}
                                                                                    label=""
                                                                                    labelPlacement={'end'}
                                                                                    disabled={isSubmitting}
                                                                                    size={"large"}
                                                                                    // onChange={(event) => {
                                                                                    //     setFieldValue("trueIndex", parseInt(event.target.value))
                                                                                    // }}
                                                                                    sx={{
                                                                                        m: 0
                                                                                    }}
                                                                                /> :
                                                                                <Checkbox
                                                                                    checked={trueIndexes.includes(index)}
                                                                                    color="success"
                                                                                    onClick={(e) => {
                                                                                        setFieldValue("trueIndexes", handleTrueIndexes(index, setFieldValue));
                                                                                    }}

                                                                                />

                                                                                // <ToggleButton
                                                                                //     value={index}
                                                                                //     aria-label="left aligned"
                                                                                //     onClick={(e) => {
                                                                                //         // console.log(e.target.value);
                                                                                //         // console.log(handleFormat(index, setFieldValue));
                                                                                //         setFieldValue("trueIndexes", handleFormat(index, setFieldValue));
                                                                                //         // setFieldValue("trueIndexes", trueIndexes)
                                                                                //
                                                                                //         // setTimeout(() => {
                                                                                //         //     // console.log("trueIndexes", trueIndexes);
                                                                                //         //     setFieldValue("trueIndexes", trueIndexes)
                                                                                //         // }, 100);
                                                                                //     }}
                                                                                //     selected={trueIndexes.includes(index)}
                                                                                //     color={'success'}
                                                                                // >
                                                                                //     <CheckIcon
                                                                                //             sx={{
                                                                                //                 pointerEvents: 'none',
                                                                                //             }}
                                                                                //     />
                                                                                // </ToggleButton>

                                                                                // <Field
                                                                                //     component={Checkbox}
                                                                                //     type="checkbox"
                                                                                //     // name={`isTrue-${index}`}
                                                                                //     name={`trueList`}
                                                                                // />
                                                                            }

                                                                        </Paper>
                                                                    }
                                                                    title=""
                                                                    subheader=""
                                                                    sx={{
                                                                        p: 1,
                                                                        // pt: 1.5,
                                                                    }}
                                                                />
                                                                <CardContent sx={{
                                                                    textAlign: 'center',
                                                                    verticalAlign: 'center',
                                                                    pt: 0,

                                                                }}>
                                                                    <Field
                                                                        component={TextField}
                                                                        type="text"
                                                                        name={`answer-${index}`}
                                                                        sx={{
                                                                            borderColor: BORDER_COLOR[index],
                                                                            "& .MuiFilledInput-root": {
                                                                                bgcolor: 'inherit',
                                                                                textAlign: 'center',
                                                                                borderRadius: "8px",
                                                                                borderWidth: '10px',
                                                                                borderColor: 'red',
                                                                                color: 'primary.lighter',
                                                                                '&:hover': {
                                                                                    bgcolor: FOCUS_COLOR[index],
                                                                                    color: 'primary.contrastText',
                                                                                },
                                                                                '&.Mui-focused': {
                                                                                    borderColor: 'red',
                                                                                    borderWidth: '10px',
                                                                                    bgcolor: FOCUS_COLOR[index],
                                                                                    color: 'primary.contrastText',
                                                                                },
                                                                                '& .MuiFilledInput-input::placeholder': {
                                                                                    color: "primary.contrastText",
                                                                                },
                                                                            },
                                                                            "& .MuiFilledInput-input": {
                                                                                // bgcolor: 'primary.dark',
                                                                                textAlign: 'center',
                                                                                verticalAlign: 'center',
                                                                                // color: 'secondary.contrastText',
                                                                                fontSize: '1.5rem',
                                                                                lineHeight: '1.5rem',
                                                                                // borderRadius: "8px",
                                                                                alignSelf: 'center',
                                                                            },

                                                                        }}
                                                                        multiline
                                                                        rows={5}
                                                                        fullWidth
                                                                        variant="filled"
                                                                        placeholder={"Nhập câu trả lời..."}
                                                                    />
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    </Slide>
                                                )}

                                                <Grid item xs={1}>
                                                    <div style={{
                                                        position: 'relative',
                                                        height: '100%',
                                                    }}>
                                                        <Paper sx={{
                                                            borderRadius: "50%",
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',

                                                        }}>
                                                            <IconButton
                                                                aria-label="settings"
                                                                color={"primary"}
                                                                size={'large'}
                                                                {...((answerNumber >= 5) && {disabled: true})}
                                                                onClick={addOneAnswer}
                                                                sx={{
                                                                    p: 0,
                                                                }}
                                                            >
                                                                <AddCircleIcon
                                                                    fontSize={'large'}
                                                                    sx={{
                                                                        fontSize: "2em"
                                                                    }}
                                                                />
                                                            </IconButton>
                                                        </Paper>
                                                    </div>
                                                </Grid>
                                            </>)}

                                    </Grid>

                                </Field>


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
                                        // defaultValue={tags.filter(item => question.tags.includes(item.id))}
                                        // sx={{
                                        //     defaultValue: [tags[1]]
                                        // }}
                                        renderInput={(params) => (
                                            <MuiTextField
                                                {...params}
                                                name="tag"
                                                error={touched['tag'] && !!errors['tag']}
                                                helperText={touched['tag'] && errors['tag']}
                                                label="Chủ đề của câu hỏi"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={4}>
                                <Paper sx={{
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: `${theme.shape.borderRadius}px`,
                                    p: 1,
                                    pt: 2,
                                    color: 'primary.contrastText',
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'inherit',
                                        color: 'primary.contrastText',
                                        '& .Mui-focused': {
                                            '& .MuiInputLabel-root': {
                                                color: 'white',
                                            }
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'white',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },

                                }}>
                                    <FormControl fullWidth>
                                        <Field
                                            component={Select}
                                            id="type"
                                            name="type"
                                            labelId="age-simple"
                                            label="Loại câu hỏi"
                                        >
                                            {/*<MenuItem value={1}>True/False</MenuItem>*/}
                                            {/*<MenuItem value={2}>Multiple choices</MenuItem>*/}
                                            {/*<MenuItem value={3}>More than one correct*/}
                                            {/*    option</MenuItem>*/}
                                            {typeOptions.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Paper>
                            </Grid>

                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={3}>
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
                                            label="Độ khó"
                                        >

                                            {difficultyOptions.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Paper>
                            </Grid>

                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={3}>
                                <LoadingButton fullWidth size="large" type="button"
                                               variant="contained"
                                               color="primary"
                                               onClick={
                                                   submitForm
                                               }
                                               style={{
                                                   height: "100%"
                                               }}
                                               loading={isSubmitting}
                                               loadingPosition="start"
                                               startIcon={<DoneOutlineIcon/>}>
                                    <span>{(isSubmitting) ? "Saving…" : "Lưu câu hỏi"}</span>
                                </LoadingButton>
                            </Grid>

                        </StyleForm>
                    </Form>
                )}
            </Formik>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK, I got it!</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openSuccessDialog}
                onClose={handleCloseSuccessDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Ok
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sửa câu hỏi thành công! 
                        Chuyển đến trang câu hỏi...
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
        ;
}
