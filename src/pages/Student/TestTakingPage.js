import styled from "@emotion/styled";
import {Box, Button, Container, Grid, Paper, Radio, Stack, Typography, useMediaQuery} from "@mui/material";
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
import {QuestionInActionResponsive} from "../../components/Question/InTestTaking/QuenstionInActionResponsive";
import {CountdownTimer} from "../../components/Timer/CountdownTimer";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: "inherit",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const renderer = (x) => {

    if (x.completed) {
    } else {
        // Render a countdown
        return <Typography variant={'h3'}>{x.hours}:{x.minutes}:{x.seconds}</Typography>;
    }
};

const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];

export default function TestTakingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const checkBreakPoint = useMediaQuery(theme.breakpoints.up('xl'));
    const checkBreakPointSm = useMediaQuery(theme.breakpoints.up('sm'));
    // console.log("kiểm tra về useMediaQuery ", checkBreakPoint)
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
        console.log('this [] effect on student test is running')

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
                                // window.alert('Success');
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
                                p: {
                                    xs: 1,
                                    lg: 4,
                                },
                                height: {
                                    sx: '90vh',
                                    sm: '95vh',
                                    md: '85vh'
                                },
                            }}
                        >

                            {checkBreakPointSm === true ?
                                null
                                : <Grid item xs={12}>
                                    <Stack direction='row'
                                           justifyContent='center'>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                px: 3,
                                                // width: '10%',
                                                textAlign: 'center',
                                                mb: 1
                                            }}>
                                            {test ? <CountdownTimer
                                                startTime={startTime}
                                                testTime ={test.time}
                                                submitForm={submitForm}
                                            /> : ""}
                                        </Paper>

                                    </Stack>
                                </Grid>}


                            <Grid item xs={12} lg={10} sx={{
                                pr: {
                                    lg: 2
                                }
                            }}>
                                {checkBreakPointSm === false ?
                                    <QuestionInActionResponsive
                                        currentQuestion={currentQuestion}
                                        currentAnswerList={answerList[currentQuestionIndex]}
                                        handleAnswerClick={handleAnswerClick}
                                        handleNextQuestion={handleNextQuestion}
                                        handlePreviousQuestion={handlePreviousQuestion}
                                        submitForm={submitForm}
                                        totalQuestion={test ? test.details.length : 100}
                                        currentQuestionIndex={currentQuestionIndex}/> :
                                    <QuestionInAction
                                        currentQuestion={currentQuestion}
                                        currentAnswerList={answerList[currentQuestionIndex]}
                                        handleAnswerClick={handleAnswerClick}
                                        handleNextQuestion={handleNextQuestion}
                                        handlePreviousQuestion={handlePreviousQuestion}
                                        submitForm={submitForm}
                                        totalQuestion={test ? test.details.length : 100}
                                        currentQuestionIndex={currentQuestionIndex}
                                    />
                                }
                            </Grid>

                            {checkBreakPointSm === false ?
                                null
                                :
                                <Grid item xs={12} sm={12} lg={2}>
                                    <Paper
                                        sx={{
                                            backgroundColor: theme.palette.primary.light,
                                            height: {
                                                sm: '100%',
                                                md: "90%",
                                                lg: '100%'
                                            },
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
                                                    height: {md: '15%', lg: "10%"},
                                                }}
                                            >
                                                <Paper sx={{textAlign: 'center'}}>
                                                    {test ? <CountdownTimer
                                                        startTime={startTime}
                                                        testTime ={test.time}
                                                        submitForm={submitForm}
                                                    /> : ""}
                                                </Paper>
                                            </Grid>

                                            <Grid
                                                sx={{
                                                    height: {xs: '0%', sm: '70%', md: "65%", lg: '80%'},
                                                    width: "100%",
                                                    maxHeight: '80%',
                                                }}
                                                xs={0} sm={12}
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
                                                                              xs={2} sm={2} md={1} lg={6} xl={4}
                                                                              sx={{mb: 1}}>

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
                                                    height: {xs: '30%', sm: '20%', md: "20%", lg: '10%'},
                                                    pt: 1
                                                }}
                                            >
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
                                                                color: theme.palette.primary.contrastText,
                                                                border: `3px solid ${theme.palette.primary.dark}`,
                                                            },
                                                        }}
                                                    >
                                                        Nộp bài
                                                    </Button>
                                                </Item>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            }
                        </Grid>

                        {/*{JSON.stringify(values)}*/}
                    </Form>
                )}
            </Formik>

        </>
    );
}
