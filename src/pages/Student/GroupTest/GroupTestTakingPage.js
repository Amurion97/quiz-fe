import {Grid, Paper, Stack} from "@mui/material";
import 'simplebar-react/dist/simplebar.min.css';
import {useEffect, useState} from "react";
import {customAPIv1} from "../../../features/customAPI";

import {Form, Formik} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
import {QuestionInAction} from "../../../components/Question/InTestTaking/QuestionInAction";
import {socket} from "../../../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/user/userSlice";
import {CountdownTimer} from "../../../components/Timer/CountdownTimer";
import {OnStopTestInFormik} from "../../../components/OnStopTestInFormik";

export default function GroupTestTakingPage() {
    const user = useSelector(selectUser)
    const navigate = useNavigate();

    const location = useLocation();
    console.log("location in group test taking:", location)
    const {state} = location;
    const roomCode = state.roomCode

    const [test, setTest] = useState(state.test);
    const [startTime] = useState(Date.now);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currentQuestion = test ? test['details'][currentQuestionIndex]['question'] : {}
    const [answerList, setAnswerList] = useState(state.test.details.map(item => {
        if (item.question.type.id <= 2) {
            return null
        } else return []
    }));
    const [isTimedOut, setIsTimedOut] = useState(false)
    console.log("answerList:", answerList)

    useEffect(() => {
        // socket.connect();
        //
        // function onConnect() {
        //     socket.emit('join-lobby',
        //         {roomCode: roomCode, email: user.info.email},
        //         (res) => {
        //             console.log('join-lobby', res);
        //             if (res.success !== false) {
        //
        //             }
        //
        //         })
        // }


        // socket.on('connect', onConnect);

        return () => {
            console.log('return for this [] effect on student group test taking is running')
            socket.disconnect()
        }
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
    const handleNextQuestion = () => {
        socket.emit('question-submit',
            {
                roomCode: roomCode,
                email: user.info.email,
                questionIndex: currentQuestionIndex,
                choice: answerList[currentQuestionIndex],
                questionId: currentQuestion.id
            }, (response) => {
                console.log("response:", response);
            })
        setCurrentQuestionIndex(
            (index) => index < test.details.length - 1 ? index + 1 : index);
    }

    useEffect(() => {
        function onRoomUpdate(arg) {
            console.log('room-update:', arg)
        }

        socket.on('room-update', onRoomUpdate)
        return () => {
            socket.off('room-update', onRoomUpdate)
        }
    })

    return (
        <>
            <Formik
                initialValues={{
                    test: state.test.id
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
                                p: {xs: 1, sm: 2, md: 4},
                                height: '100vh',
                            }}
                        >
                            <Grid item xs={12}>
                                <Stack direction='row'
                                       justifyContent='center'>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                        px: 3,
                                        width: 'object-fit',
                                        textAlign: 'center'
                                    }}>
                                        {test ? <CountdownTimer
                                            startTime={startTime}
                                            testTime={test.time}
                                            submitForm={submitForm}
                                        /> : ""}
                                    </Paper>

                                </Stack>
                            </Grid>

                            <Grid item xs={12}
                                  sx={{height: '90%'}}
                            >
                                <QuestionInAction
                                    currentQuestion={currentQuestion}
                                    currentAnswerList={answerList[currentQuestionIndex]}
                                    handleAnswerClick={handleAnswerClick}
                                    handleNextQuestion={handleNextQuestion}
                                    submitForm={submitForm}
                                    totalQuestion={test ? test.details.length : 100}
                                    currentQuestionIndex={currentQuestionIndex}
                                />

                            </Grid>


                        </Grid>

                        {/*{JSON.stringify(values)}*/
                        }
                        <OnStopTestInFormik submitForm={submitForm}/>
                    </Form>
                )}
            </Formik>

        </>
    )
        ;
}
