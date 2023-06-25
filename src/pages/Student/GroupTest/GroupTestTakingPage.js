import {Button, Grid, Paper, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import 'simplebar-react/dist/simplebar.min.css';
import {useEffect, useState} from "react";
import {customAPIv1} from "../../../features/customAPI";

import {Form, Formik} from "formik";
import Countdown from 'react-countdown';
import {useLocation, useNavigate} from "react-router-dom";
import {QuestionInAction} from "../../../components/Question/InTestTaking/QuestionInAction";
import {socket} from "../../../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/user/userSlice";

export default function GroupTestTakingPage() {
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const theme = useTheme();

    const location = useLocation();
    // console.log("location in group test taking:", location)
    const {state} = location;
    let id = 5
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

    function connect() {
        socket.connect();
    }

    // const roomCode = 269612
    const roomCode = 991120
    //
    function connectToLobby() {
        socket.emit('join-lobby',
            {roomCode: roomCode, email: user.info.email},
            (res) => {
                console.log('join-lobby', res)
            })
    }

    function connectToRoom() {
        socket.emit('join-room',
            {roomCode: roomCode, email: user.info.email}, (res) => {
                console.log('join-room response:', res)
            })
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
                                height: '100vh',
                            }}
                        >
                            <Grid item xs={12}>
                                <Stack direction='row'>
                                    <Paper>
                                        {test ? <Countdown
                                            date={startTime + (1000 * 60 * test.time)}
                                            renderer={(x) => {
                                                return renderer(x, submitForm, isSubmitting)
                                            }}
                                        /> : ""}
                                    </Paper>

                                    <Button onClick={connect}>Connect</Button>
                                    <Button type={'button'} onClick={connectToLobby}>
                                        Connect to lobby 1
                                    </Button>

                                    <Button type={'button'} onClick={connectToRoom}>
                                        Connect to room
                                    </Button>
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
                                />

                            </Grid>


                        </Grid>

                        {/*{JSON.stringify(values)}*/}
                    </Form>
                )}
            </Formik>

        </>
    );
}
