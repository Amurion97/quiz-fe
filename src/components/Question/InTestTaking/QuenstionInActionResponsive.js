import {Box, Button, Grid, Paper, Radio, Stack, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {alpha, useTheme} from "@mui/material/styles";

const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];

export function QuestionInActionResponsive({
                                               currentQuestion,
                                               handleAnswerClick,
                                               currentAnswerList,
                                               handleNextQuestion,
                                               handlePreviousQuestion,
                                               submitForm,
                                               totalQuestion,
                                               currentQuestionIndex
                                           }) {
    const theme = useTheme()
    return (<>
        <Grid container spacing={7}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                    }}
                    elevation={3}
                >
                    <Grid
                        container
                        sx={{
                            p: 3,
                            px: {
                                xs: 1,
                                sm: 2,
                                md: 3,
                            },
                            pt: {
                                xs: 0
                            },
                            height: '100%',
                        }}
                    >
                        <Grid item xs={12} sx={{
                            py: 2,
                            height: '50%',
                        }}>
                            <Paper
                                sx={{
                                    height: '80%',
                                    backgroundColor: theme.palette.primary.darker,
                                    color: theme.palette.primary.contrastText,
                                    p: {xs: 1, sm: 2, md: 3}
                                }}
                            >
                                <Typography variant={'body1'}>
                                    Câu hỏi số {currentQuestionIndex}: {currentQuestion.content}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
                                    <Grid
                                        key={index}
                                        item xs={12}
                                        sx={{
                                            // pl: (index === 0) ? 0 : 2,
                                            height: '80%',
                                        }}
                                    >
                                        <Paper
                                            sx={{
                                                height: '30%',
                                                bgcolor: BG_COLOR[index],
                                                p: 2,
                                                color: theme.palette.primary.contrastText,
                                                boxShadow: `4px 6px ${alpha('#595959', 0.4)}`,
                                            }}
                                            elevation={3}
                                        >

                                            <Box sx={{
                                                width: '100%',
                                                position: 'relative',
                                            }}>
                                                <Paper sx={{
                                                    borderRadius: `${currentQuestion.type.id <= 2 ? "50%" : theme.shape.borderRadius}`,
                                                    // mr: 1,
                                                    // mt: 0.5,
                                                    // mb: 1,
                                                    height: '25px',
                                                    width: '25px',
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
                                                            checked={currentAnswerList === answer.id}
                                                            sx={{
                                                                height: '10px',
                                                                width: '10px',
                                                            }}
                                                        />
                                                        :
                                                        <Checkbox
                                                            checked={currentAnswerList.includes(answer.id)}
                                                            color="success"
                                                            onClick={() => {
                                                                handleAnswerClick(answer.id)
                                                            }}
                                                            sx={{
                                                                height: '10px',
                                                                width: '10px',
                                                            }}
                                                        />
                                                    }
                                                </Paper>
                                            </Box>

                                            <Typography variant={'body2'}
                                                        sx={{mr: 5}}
                                            >
                                                {answer.content}
                                            </Typography>

                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Stack
                    direction="row"
                    justifyContent={handlePreviousQuestion && currentQuestionIndex > 0 ? "space-between" : 'flex-end'}
                    alignItems="flex-end"
                    spacing={2}
                    sx={{
                        height: '9%',
                    }}
                >
                    {(handlePreviousQuestion && currentQuestionIndex > 0) &&
                        <Button variant="outlined" size='large'
                                sx={{
                                    fontSize: 20,
                                }}
                                onClick={handlePreviousQuestion}
                        >
                            Câu trước
                        </Button>}
                    {currentQuestionIndex === totalQuestion - 1 ?
                        <Button variant="contained" size='large' sx={{fontSize: 20,}}
                                onClick={() => {
                                    submitForm()
                                    handleNextQuestion()
                                }}
                        >
                            Nộp bài
                        </Button>
                        :
                        <Button variant="contained" size='large' sx={{fontSize: 20,}}
                                onClick={handleNextQuestion}
                        >
                            Câu tiếp
                        </Button>}
                </Stack>
            </Grid>
        </Grid>
    </>)
}