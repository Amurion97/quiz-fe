
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Grid,
    Paper,
    Radio,
    FormControlLabel,
    RadioGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

//MUI icon
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AlarmIcon from "@mui/icons-material/Alarm";
import Checkbox from "@mui/material/Checkbox";
//React
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SimpleBar from "simplebar-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

export default function TestResultPage() {
    const location = useLocation();

    console.log("location in test result:", location);
    let user = useSelector(selectUser);
    const { state } = location;
    let test, attempt, choices, time;
    if (state) {
        ({ test, attempt, choices, time } = state);
    }
    time = new Date(time);
    const questions = test ? test.details.map((item) => item.question) : [];
    const theme = useTheme();

    const [openQuestionIDs, setOpenQuestionIDs] = useState([]);

    const handleContentClick = (questionId) => {
        setOpenQuestionIDs((openingQuestions) => {
            // console.log("openQsIds:", openingQuestions)
            if (openingQuestions.includes(questionId)) {
                return openingQuestions.filter((id) => {
                    console.log("id", id);
                    console.log("questionId", questionId);
                    return id !== questionId;
                });
            } else {
                return [...openingQuestions, questionId];
            }
        });
    };
    return (
        <>
            <Helmet>
                <title> Test Result | Quiz </title>
            </Helmet>

            <Typography variant="h3" sx={{ px: 5 }}>
                Kết Quả Bài Thi
            </Typography>
            <Grid
                container
                spacing={1}
                sx={{
                    // px: 10,
                    // pt: 5,
                }}
                
            >
                <Grid item xs={12}
                lg={4}

                 >
                    <Paper sx={{ p: "20px" }}>
                        <Card>
                            <Grid container>
                                <Grid item xs={8}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                src="/assets/images/avatars/avatar_default.jpg"
                                                alt="photoURL"
                                            />
                                        }
                                        title={user.info.email}
                                        subheader={attempt.finish}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardActions
                                        disableSpacing
                                        sx={{
                                            pt: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <IconButton aria-label="share"></IconButton>
                                    </CardActions>
                                </Grid>
                            </Grid>
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                ></Typography>
                            </CardContent>
                        </Card>

                        <Paper
                            elevation={3}
                            sx={{ px: 2, mt: 2, mb: 2, pb: "10px" }}
                        >
                            Độ chính xác
                            <ProgressBar
                                completed={attempt.score}
                                maxCompleted={100}
                                height={'28px'}
                                bgColor={theme.palette.primary.main}
                            />
                        </Paper>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            justifyContent={"center"}
                        >
                            <Grid item xs={6}>
                                <Card>
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={8}
                                            sx={{ pb: "24px" }}
                                            textAlign={"center"}
                                        >
                                            <CardHeader
                                                title={attempt.corrects}
                                                subheader="Câu chính xác"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <CardActions disableSpacing>
                                                <TaskAltIcon
                                                    sx={{
                                                        fontSize: 48,
                                                        color: theme.palette
                                                            .success.main,
                                                    }}
                                                />
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={8}
                                            sx={{ pb: "24px" }}
                                            textAlign={"center"}
                                        >
                                            <CardHeader
                                                title={attempt.incorrects}
                                                subheader="Câu không chính xác"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <CardActions disableSpacing>
                                                <HighlightOffIcon
                                                    sx={{
                                                        fontSize: 48,
                                                        color: theme.palette
                                                            .error.main,
                                                    }}
                                                />
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={8}
                                            sx={{ pb: "24px" }}
                                            textAlign={"center"}
                                        >
                                            <CardHeader
                                                title={`${time.getMinutes()}m${time.getSeconds()}s`}
                                                subheader="Thời gian làm"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <CardActions disableSpacing>
                                                <AlarmIcon
                                                    sx={{
                                                        fontSize: 48,
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                />
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={8} >
                    <Paper
                        sx={{
                            p: "28px",
                        }}
                    >
                        <Typography variant="body1" fontWeight="bold">
                            Câu hỏi có trong bài
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Bấm vào câu hỏi để xem câu trả lời
                        </Typography>
                        <SimpleBar style={{ maxHeight: "60vh" }}>
                            {questions.map((question, index) => {
                                let correct = true;
                                if (question.type.id <= 2) {
                                    const trueAnswerID = question.answers.find(
                                        (item) => item.isTrue
                                    ).id;
                                    if (choices[index] !== trueAnswerID) {
                                        correct = false;
                                    }
                                } else if (question.type.id === 3) {
                                    const trueAnswers = question.answers.filter(
                                        (item) => item.isTrue
                                    );
                                    const trueAnswerIDs = trueAnswers
                                        .map((item) => item.id)
                                        .sort((a, b) => a - b);
                                    if (
                                        trueAnswerIDs.length !==
                                        choices[index].length
                                    ) {
                                        correct = false;
                                    } else {
                                        choices[index] = choices[index].sort(
                                            (a, b) => a - b
                                        );
                                        for (
                                            let i = 0;
                                            i < trueAnswerIDs.length;
                                            i++
                                        ) {
                                            if (
                                                trueAnswerIDs[i] !==
                                                choices[index][i]
                                            ) {
                                                correct = false;
                                                break;
                                            }
                                        }
                                    }
                                }

                                return (
                                    <Card
                                        elevation={3}
                                        sx={{
                                            px: 0,
                                            mt: 2,
                                            mb: 2,
                                        }}
                                        key={question.id}
                                    >
                                        <Grid
                                            container
                                            onClick={() => {
                                                handleContentClick(question.id);
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={0.5}
                                                sx={{
                                                    bgcolor: correct
                                                        ? theme.palette.success
                                                              .main
                                                        : theme.palette.error
                                                              .main,
                                                }}
                                            />
                                            <Grid item xs={11.5}>
                                                <CardContent>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ pl: 4 }}
                                                    >
                                                        Câu hỏi {index + 1}:{" "}
                                                        {question.content}
                                                    </Typography>
                                                    <hr />
                                                </CardContent>
                                                {openQuestionIDs.includes(
                                                    question.id
                                                ) && (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sx={{ pl: 1.4 }}
                                                    >
                                                        <RadioGroup
                                                            sx={{
                                                                mb: 2,
                                                            }}
                                                        >
                                                            {question.answers.map(
                                                                (answer) => {
                                                                    const wrong =
                                                                        answer.isTrue ===
                                                                            false &&
                                                                        (question
                                                                            .type
                                                                            .id <=
                                                                        2
                                                                            ? choices[
                                                                                  index
                                                                              ] ===
                                                                              answer.id
                                                                            : choices[
                                                                                  index
                                                                              ].includes(
                                                                                  answer.id
                                                                              ));
                                                                    return (
                                                                        <FormControlLabel
                                                                            key={
                                                                                answer.id
                                                                            }
                                                                            value={
                                                                                answer.id
                                                                            }
                                                                            control={
                                                                                question
                                                                                    .type
                                                                                    .id <=
                                                                                2 ? (
                                                                                    <Radio />
                                                                                ) : (
                                                                                    <Checkbox />
                                                                                )
                                                                            }
                                                                            label={
                                                                                answer.content
                                                                            }
                                                                            checked={
                                                                                question
                                                                                    .type
                                                                                    .id <=
                                                                                2
                                                                                    ? choices[
                                                                                          index
                                                                                      ] ===
                                                                                      answer.id
                                                                                    : choices[
                                                                                          index
                                                                                      ].includes(
                                                                                          answer.id
                                                                                      )
                                                                            }
                                                                            disabled={
                                                                                true
                                                                            }
                                                                            sx={{
                                                                                bgcolor:
                                                                                    answer.isTrue ===
                                                                                    true
                                                                                        ? theme
                                                                                              .palette
                                                                                              .success
                                                                                              .light
                                                                                        : wrong
                                                                                        ? theme
                                                                                              .palette
                                                                                              .error
                                                                                              .light
                                                                                        : "",
                                                                            }}
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </RadioGroup>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                );
                            })}
                        </SimpleBar>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
