import {useEffect, useState} from 'react';
// @mui
import {
    Grid, IconButton,
    CardHeader, Card, CardContent, Radio, FormControlLabel, Typography, FormControl, Paper,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {styled, useTheme} from "@mui/material/styles";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// formik
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import {
    TextField, RadioGroup, Select
} from 'formik-mui';

// functions
import VNNumParser from "../../../functions/NumberParser";
import {customAPIv1} from "../../../features/customAPI";

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
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

// ----------------------------------------------------------------------

export default function QuestionCreationForm() {
    const theme = useTheme();
    const [answerNumber, setAnswerNumber] = useState(2);
    const addOneAnswer = () => {
        setAnswerNumber((prevState) => prevState + 1)
    }
    const removeOneAnswer = () => {
        setAnswerNumber((prevState) => prevState - 1)
    }
    const formSubmition = (values, {setSubmitting}) => {
        console.log("trying to submit:", values);
        values.trueIndex = parseInt(values.trueIndex);
        values.type = parseInt(values.type);

        let answers = [];
        for (let i = 0; i < answerNumber; i++) {
            answers.push({
                content: values[`content-${i}`],
            })
        }
        values.answers = answers;

        console.log("processed values:", values);
        try {
            customAPIv1().post("/flights", {
                name: values.name,
                aircraft: values.aircraft.id,
                start: values.start,
                end: values.end,
                from: values.from.id,
                to: values.to.id,
                rows: answers,
                seats: parseInt(values.seats)
            })
                .then(() => {
                    setSubmitting(false)
                })
        } catch (e) {
            console.log("error in save flight:", e);
            window.alert('failed, try again');
            setSubmitting(false)
        }
        console.log()
    }
    return (
        <>
            <Formik
                initialValues={{
                    trueIndex: 0,
                    type: 1
                }}
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={formSubmition}
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
                                            bgcolor: 'secondary.main',
                                            textAlign: 'center',
                                            borderRadius: "8px",
                                            borderWidth: '10px',
                                            borderColor: 'red',
                                            color: 'primary.lighter',
                                            '&:hover': {
                                                bgcolor: 'secondary.dark',
                                                color: 'primary.contrastText',
                                            },
                                            '&.Mui-focused': {
                                                borderColor: 'red',
                                                borderWidth: '10px',
                                                // bgcolor: 'primary.dark',
                                                bgcolor: 'secondary.darker',
                                                color: 'primary.contrastText',
                                            },
                                        },
                                        "& .MuiFilledInput-input": {
                                            // bgcolor: 'primary.dark',
                                            textAlign: 'center',
                                            verticalAlign: 'center',
                                            // color: 'secondary.contrastText',
                                            fontSize: '2rem',
                                            lineHeight: '2rem',
                                            // borderRadius: "8px",
                                            alignSelf: 'center',
                                        },

                                    }}
                                    multiline
                                    rows={5}
                                    fullWidth
                                    variant="filled"
                                    placeholder={"Type your question here"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <p>{JSON.stringify(values)}</p>
                            </Grid>

                            <Grid item xs={12}>
                                <Field component={RadioGroup} name="trueIndex">

                                    <Grid container spacing={{xs: 0.5, md: 1}} columns={{xs: 13}}>

                                        <Grid item xs={6} sm={6} md={6}>
                                            <Card sx={{
                                                boxShadow: `0 8px ${theme.palette.primary.main}`,
                                                mb: 1
                                            }}
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <IconButton aria-label="settings"
                                                                    color={"error"}
                                                                    {...((answerNumber <= 2) && {disabled: true})}>
                                                            <DeleteOutlineIcon/>
                                                        </IconButton>
                                                    }
                                                    action={
                                                        <FormControlLabel
                                                            value={0}
                                                            control={<Radio
                                                                disabled={isSubmitting}/>}
                                                            label=""
                                                            disabled={isSubmitting}
                                                            icon={<FavoriteBorder/>}
                                                            checkedIcon={<Favorite/>}
                                                        />
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
                                                    <Typography variant={'h4'}>
                                                        True
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={6}>
                                            <Card sx={{
                                                boxShadow: `0 8px ${theme.palette.primary.main}`,
                                                mb: 1
                                            }}
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <IconButton aria-label="settings"
                                                                    color={"error"}
                                                                    {...((answerNumber <= 2) && {disabled: true})}>
                                                            <DeleteOutlineIcon/>
                                                        </IconButton>
                                                    }
                                                    action={
                                                        <FormControlLabel
                                                            value={1}
                                                            control={<Radio
                                                                disabled={isSubmitting}/>}
                                                            label=""
                                                            disabled={isSubmitting}
                                                            // onChange={(event) => {
                                                            //     setFieldValue("trueIndex", parseInt(event.target.value))
                                                            // }}
                                                        />
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
                                                    <Typography variant={'h4'}>
                                                        False
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        {[...Array(answerNumber)].map((x, index) => (
                                            <Grid item xs={12 / answerNumber}
                                                // sm={6} md={6}
                                                  sx={{
                                                      transition: theme.transitions.create([
                                                              'width'
                                                          ],
                                                          {
                                                              duration: theme.transitions.duration.standard,
                                                          }),
                                                  }}
                                            >
                                                <Card sx={{
                                                    boxShadow: `0 8px ${theme.palette.primary.main}`,
                                                    mb: 1
                                                }}
                                                >
                                                    <CardHeader
                                                        avatar={
                                                            <IconButton aria-label="settings"
                                                                        color={"error"}
                                                                        {...((answerNumber <= 2) && {disabled: true})}
                                                                        onClick={removeOneAnswer}
                                                            >
                                                                <DeleteOutlineIcon/>
                                                            </IconButton>
                                                        }
                                                        action={
                                                            <FormControlLabel
                                                                value={1}
                                                                control={<Radio
                                                                    disabled={isSubmitting}/>}
                                                                label=""
                                                                disabled={isSubmitting}
                                                                // onChange={(event) => {
                                                                //     setFieldValue("trueIndex", parseInt(event.target.value))
                                                                // }}
                                                            />
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
                                                        <Field
                                                            component={TextField}
                                                            type="text"
                                                            // label="Flight name"
                                                            name={`question-${index}`}
                                                            sx={{
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
                                                                    bgcolor: 'secondary.main',
                                                                    textAlign: 'center',
                                                                    borderRadius: "8px",
                                                                    borderWidth: '10px',
                                                                    borderColor: 'red',
                                                                    color: 'primary.lighter',
                                                                    '&:hover': {
                                                                        bgcolor: 'secondary.dark',
                                                                        color: 'primary.contrastText',
                                                                    },
                                                                    '&.Mui-focused': {
                                                                        borderColor: 'red',
                                                                        borderWidth: '10px',
                                                                        // bgcolor: 'primary.dark',
                                                                        bgcolor: 'secondary.darker',
                                                                        color: 'primary.contrastText',
                                                                    },
                                                                },
                                                                "& .MuiFilledInput-input": {
                                                                    // bgcolor: 'primary.dark',
                                                                    textAlign: 'center',
                                                                    verticalAlign: 'center',
                                                                    // color: 'secondary.contrastText',
                                                                    fontSize: '2rem',
                                                                    lineHeight: '2rem',
                                                                    // borderRadius: "8px",
                                                                    alignSelf: 'center',
                                                                },

                                                            }}
                                                            multiline
                                                            rows={5}
                                                            fullWidth
                                                            variant="filled"
                                                            placeholder={"Type your question here"}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}

                                        <Grid item xs={1}>
                                            <IconButton aria-label="settings"
                                                        color={"error"}
                                                        {...((answerNumber >= 5) && {disabled: true})}
                                                        onClick={addOneAnswer}
                                                // sx={{
                                                //     position: "fixed",
                                                //     top: "50%",
                                                //     left: "50%",
                                                // }}
                                            >
                                                <DeleteOutlineIcon/>
                                            </IconButton>
                                        </Grid>

                                    </Grid>

                                </Field>


                            </Grid>
                            <Grid item xs={4}>
                                <Paper sx={{
                                    bgcolor: theme.palette.secondary.lighter,
                                    borderRadius: `${theme.shape.borderRadius}px`,
                                    p: 1,
                                }}>
                                    <FormControl fullWidth>
                                        <Field
                                            component={Select}
                                            id="type"
                                            name="type"
                                            labelId="age-simple"
                                            label="Question type"
                                        >
                                            <MenuItem value={1}>True/False</MenuItem>
                                            <MenuItem value={2}>Multiple choices</MenuItem>
                                            <MenuItem value={3}>More than one correct
                                                option</MenuItem>
                                        </Field>
                                    </FormControl>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4}>
                                <LoadingButton fullWidth size="large" type="button"
                                               variant="contained"
                                               color="secondary"
                                               onClick={
                                                   submitForm
                                               }
                                               style={{
                                                   height: "100%"
                                               }}
                                               loading={isSubmitting}
                                               loadingPosition="start"
                                               startIcon={<DoneOutlineIcon/>}>
                                    <span>{(isSubmitting) ? "Saving…" : "Save this flight"}</span>
                                </LoadingButton>
                            </Grid>

                        </StyleForm>
                    </Form>
                )}
            </Formik>
        </>
    );
}
