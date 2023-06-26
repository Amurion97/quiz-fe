import styled from "@emotion/styled";
import {Box, Button, Grid, Paper, Radio, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {alpha, useTheme} from "@mui/material/styles";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";

import {Form, Formik} from "formik";
import Checkbox from "@mui/material/Checkbox";
import Countdown from 'react-countdown';
import {useLocation, useNavigate} from "react-router-dom";
import {QuestionInAction} from "../../components/Question/InTestTaking/QuestionInAction";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: "inherit",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];

export default function TestTakingPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    const location = useLocation();
    // console.log("location in test taking:", location)
    const {state} = location;
    let id
    if (state) {
        ({id} = state)
    }

    const [test, setTest] = useState(null);
    const [startTime] = useState(Date.now);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currentQuestion = test ? test['details'][currentQuestionIndex]['question'] : {}
    const [answerList, setAnswerList] = useState([]);
    const [isTimedOut, setIsTimedOut] = useState(false)
    // console.log("answerList:", answerList)
    useEffect(() => {
        customAPIv1().get(`tests/${id}`)
            .then(res => {
                console.log('test:', res.data.data)
                setTest(res.data.data);
                setAnswerList(res.data.data.details.map(item => {
                    if (item.question.type.id <= 2) {
                        return null
                    } else return []
                }))
            })
    }, [])
    const handleAnswerClick = (answerIndex) => {
        console.log("answerList pre-process", answerList)
        if (currentQuestion.type.id <= 2) {
            answerList[currentQuestionIndex] = answerIndex
        } else {
            let index = answerList[currentQuestionIndex].findIndex(item => item === answerIndex)
            if (index < 0) {
                answerList[currentQuestionIndex].push(answerIndex)
            } else {
                answerList[currentQuestionIndex].splice(index, 1);

            }
        }
        setAnswerList([...answerList])
    }
    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(
            (index) => index > 0 ? index - 1 : index
        )
    }

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(
            (index) => index < test.details.length - 1 ? index + 1 : index)
    }

    let count = 0;
    const renderer = (x, submitForm, isSubmitting) => {

        if (x.completed) {
            count++;
            console.log("time out:", count);

            // Render a completed state
            setIsTimedOut(true);
            if (!isSubmitting && isTimedOut && count === 2) {
                setTimeout(() => {
                    if (!isSubmitting && isTimedOut && count === 2) {
                        window.alert("Time out!");
                        submitForm();
                    }
                }, 1000)

            }

        } else {
            // Render a countdown
            return <span>{x.hours}:{x.minutes}:{x.seconds}</span>;
        }
    };
    return (
        <>
            <Formik
                initialValues={{
                    test: id
                }}
                onSubmit={(values, props) => {
                    values.answers = answerList;
                    console.log("values", values);
                    if (!props.isSubmitting) {
                        customAPIv1().post('/attempts', values)
                            .then(res => {
                                window.alert('Success');
                                navigate("/students/result", {
                                    state: {
                                        test: test,
                                        attempt: res.data.data,
                                        choices: answerList,
                                        time: Date.now() - startTime
                                    }
                                })
                            })
                            .catch(e => {
                                console.log("error in submit:", e)
                            })
                    }

                }
                }
                enableReinitialize={true}
            >
                {({
                      values,
                      submitForm,
                      isSubmitting,
                  }) => (
                    <Form>
                        <Grid
                            container
                            sx={{
                                p: 4,
                                height: '85vh',
                            }}
                        >

                            <Grid item xs={10} sx={{pr: 2}}>
                                <QuestionInAction
                                    currentQuestion={currentQuestion}
                                    currentAnswerList={answerList[currentQuestionIndex]}
                                    handleAnswerClick={handleAnswerClick}
                                    handleNextQuestion={handleNextQuestion}
                                    handlePreviousQuestion={handlePreviousQuestion}
                                />

                            </Grid>

                            <Grid item xs={2}>
                                <Paper
                                    sx={{
                                        backgroundColor: theme.palette.primary.light,
                                        height: "100%",
                                        width: "100%",
                                        maxHeight: "100%",
                                    }}
                                    elevation={3}
                                >
                                    <Grid
                                        container
                                        sx={{
                                            height: "100%",
                                            width: "100%",
                                            p: 2,
                                            maxHeight: '80vh',
                                        }}
                                        spacing={0}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid
                                            xs={12}
                                            sx={{
                                                height: "10%",
                                            }}
                                        >
                                            <Paper>
                                                {test ? <Countdown
                                                    date={startTime + (1000 * 60 * test.time)}
                                                    renderer={(x) => {
                                                        return renderer(x, submitForm, isSubmitting)
                                                    }}
                                                /> : ""}
                                            </Paper>
                                        </Grid>
                                        <Grid
                                            sx={{
                                                height: "80%",
                                                width: "100%",
                                                maxHeight: '80%',
                                            }}
                                            xs={12}
                                        >
                                            <Paper
                                                sx={{
                                                    backgroundColor: theme.palette.primary.darker,
                                                    height: "100%",
                                                    width: "100%",
                                                    maxHeight: "100%",
                                                }}
                                            >
                                                <SimpleBar style={{maxHeight: "100%"}}>
                                                    <Grid
                                                        container spacing={1}
                                                        sx={{
                                                            pl: 3, pt: 3
                                                        }}

                                                    >
                                                        {test && test.details.map((item, index) => {
                                                                const done = (test.details[index].question.type.id <= 2) ?
                                                                    answerList[index] !== null
                                                                    : answerList[index].length > 0
                                                                ;
                                                                return (
                                                                    <Grid key={item.no}
                                                                          xs={4} sx={{mb: 1}}>

                                                                        <Avatar sx={{
                                                                            width: 56, height: 56,
                                                                            bgcolor: done ? BG_COLOR[0] : theme.palette.background.paper,
                                                                            color: 'primary.darker',
                                                                            fontSize: 'bold',
                                                                        }}
                                                                                onClick={() => {
                                                                                    setCurrentQuestionIndex(index)
                                                                                }
                                                                                }
                                                                        >
                                                                            {item.no}
                                                                        </Avatar>

                                                                    </Grid>
                                                                )
                                                            }
                                                        )}


                                                    </Grid>
                                                </SimpleBar>

                                            </Paper>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                height: "10%",
                                                pt: 1
                                            }}
                                        >
                                            {/*<Grid item xs={6}>*/}
                                            {/*    <Item>*/}
                                            {/*        <Button*/}
                                            {/*            variant="outlined"*/}
                                            {/*            color="error" size="large"*/}
                                            {/*        >*/}
                                            {/*            Cancel*/}
                                            {/*        </Button>*/}
                                            {/*    </Item>*/}
                                            {/*</Grid>*/}

                                            {/*<Grid item xs={6}>*/}
                                            <Item>
                                                <Button
                                                    variant="outlined"
                                                    color="primary" size="large"
                                                    onClick={submitForm}
                                                    sx={{
                                                        fontSize: 26,
                                                        border: `3px solid ${theme.palette.primary.dark}`,
                                                        color: theme.palette.primary.dark,
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.primary.dark,
                                                            // borderColor: '#0062cc',
                                                            // boxShadow: 'none',
                                                            color: theme.palette.primary.contrastText,
                                                            border: `3px solid ${theme.palette.primary.dark}`,
                                                        },
                                                    }}
                                                >
                                                    Nộp bài
                                                </Button>
                                            </Item>
                                            {/*</Grid>*/}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>

                        {/*{JSON.stringify(values)}*/}
                    </Form>
                )}
            </Formik>

        </>
    );
}
