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
                                <Paper
                                    sx={{
                                        backgroundColor: theme.palette.primary.light,
                                        height: '91%',
                                    }}
                                    elevation={3}
                                >
                                    <Grid
                                        container
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                        }}
                                    >
                                        <Grid item xs={12} sx={{
                                            p: 2,
                                            height: '50%',
                                        }}>
                                            <Paper
                                                sx={{
                                                    height: '100%',
                                                    backgroundColor: theme.palette.primary.darker,
                                                    color: theme.palette.primary.contrastText,
                                                    p: 3
                                                }}
                                            >
                                                <Typography variant={'h4'}>
                                                    {currentQuestion.content}
                                                </Typography>
                                            </Paper>
                                        </Grid>

                                        {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
                                            <Grid
                                                key={index}
                                                item xs={12 / currentQuestion.answers.length}
                                                sx={{
                                                    pl: (index === 0) ? 0 : 2,
                                                    height: '50%',
                                                }}
                                            >
                                                <Paper
                                                    sx={{
                                                        height: '100%',
                                                        bgcolor: BG_COLOR[index],
                                                        p: 2,
                                                        color: theme.palette.primary.contrastText,
                                                        boxShadow: `5px 8px ${alpha('#595959', 0.4)}`,
                                                    }}
                                                    elevation={3}
                                                >

                                                    <Box sx={{
                                                        width: '100%',
                                                        position: 'relative',
                                                    }}>
                                                        <Paper sx={{
                                                            borderRadius: `${currentQuestion.type.id <= 2 ? "50%" : theme.shape.borderRadius}`,
                                                            mr: 1,
                                                            mt: 0.5,
                                                            mb: 1,
                                                            height: '48px',
                                                            width: '48px',
                                                            position: 'absolute',
                                                            right: 0,
                                                            textAlign: 'center'
                                                        }}>
                                                            {currentQuestion.type.id <= 2 ?
                                                                <Radio
                                                                    onClick={() => {
                                                                        handleAnswerClick(answer.id)
                                                                    }
                                                                    }
                                                                    checked={answerList[currentQuestionIndex] === answer.id}
                                                                    sx={{
                                                                        height: '48px',
                                                                        width: '48px',
                                                                    }}
                                                                />
                                                                :
                                                                <Checkbox
                                                                    checked={answerList[currentQuestionIndex].includes(answer.id)}
                                                                    color="success"
                                                                    onClick={() => {
                                                                        handleAnswerClick(answer.id)
                                                                    }}
                                                                    sx={{
                                                                        height: '48px',
                                                                        width: '48px',
                                                                    }}
                                                                />
                                                            }
                                                        </Paper>
                                                    </Box>

                                                    <Typography variant={'h5'}
                                                                sx={{mt: 8}}>
                                                        {answer.content}
                                                    </Typography>

                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-end"
                                    spacing={2}
                                    sx={{
                                        height: '9%',

                                    }}
                                >
                                    <Button variant="outlined" size='large' sx={{fontSize: 20,}}
                                            onClick={() => {
                                                setCurrentQuestionIndex(
                                                    (index) => index > 0 ? index - 1 : index
                                                )

                                            }}
                                    >
                                        Previous
                                    </Button>

                                    <Button variant="contained" size='large' sx={{fontSize: 20,}}
                                            onClick={() => {
                                                setCurrentQuestionIndex(
                                                    (index) => index < test.details.length - 1 ? index + 1 : index)

                                            }}
                                    >
                                        Next
                                    </Button>
                                </Stack>
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
                                                    Submit
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
