import {Box, Button, Grid, Paper, Radio, Stack, Typography, useMediaQuery} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {alpha, useTheme} from "@mui/material/styles";

const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];
const BG_COLOR_SCROLL = ["#008453", "#005A94", "#945000", "#940084", "#94002D"];

export function QuestionInAction({
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
    const isMd = useMediaQuery(theme => theme.breakpoints.up('md'))
    return (<>
        <Paper
            sx={{
                backgroundColor: theme.palette.primary.light,
                height: {sx: '120%', md: '91%'},
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
                    // p: 2,
                    height: '50%',
                    pb: 2,
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
                            Câu hỏi số {currentQuestionIndex}: {currentQuestion.content}
                        </Typography>
                    </Paper>
                </Grid>

                {isMd ?
                    currentQuestion.answers && currentQuestion.answers.map((answer, index) => (
                        <Grid
                            key={index}
                            item xs={12} md={12 / currentQuestion.answers.length}
                            sx={{
                                pl: (index === 0) ? 0 : 2,
                                height: '50%',
                            }}
                        >
                            <Paper
                                sx={{
                                    height: '100%',
                                    bgcolor: BG_COLOR[index],
                                    p: 1,
                                    pl: 2,
                                    color: theme.palette.primary.contrastText,
                                    boxShadow: `5px 8px ${alpha('#595959', 0.4)}`,
                                    overflow: 'auto',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        backgroundColor: BG_COLOR[index],
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: BG_COLOR_SCROLL[index],
                                        borderRadius: '10px',
                                    },
                                }}
                                elevation={2}
                            >

                                <Box sx={{
                                    width: '100%',
                                    position: 'relative',
                                }}>
                                    <Paper sx={{
                                        borderRadius: `${currentQuestion.type.id <= 2 ? "50%" : theme.shape.borderRadius}`,
                                        // mr: {sm: 0, md: 0.5, lg: 1},
                                        // mt: {sm: 0, lg: 0.5},
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
                                                checked={currentAnswerList === answer.id}
                                                sx={{
                                                    height: '48px',
                                                    width: '48px',
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
                    ))
                    : <>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1.5}
                            sx={{width: '100%'}}
                        >


                            {currentQuestion.answers && currentQuestion.answers.map((answer, index) => (

                                <Paper
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        bgcolor: BG_COLOR[index],
                                        p: 1,
                                        color: theme.palette.primary.contrastText,
                                        boxShadow: `5px 8px ${alpha('#595959', 0.4)}`,
                                        overflow: 'auto',
                                        '&::-webkit-scrollbar': {
                                            width: '8px',
                                            backgroundColor: BG_COLOR[index],
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: BG_COLOR_SCROLL[index],
                                            borderRadius: '10px',
                                        },
                                    }}
                                    elevation={2}
                                >

                                    <Box sx={{
                                        width: '100%',
                                        position: 'relative',
                                    }}>
                                        <Paper sx={{
                                            borderRadius: `${currentQuestion.type.id <= 2 ? "50%" : theme.shape.borderRadius}`,
                                            // mr: {sm: 0, md: 0.5, lg: 1},
                                            // mt: {sm: 0, lg: 0.5},
                                            mb: 1,
                                            height: '48px',
                                            width: '48px',
                                            position: 'absolute',
                                            right: -1,
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
                                                        height: '48px',
                                                        width: '48px',
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
                                                        height: '48px',
                                                        width: '48px',
                                                    }}
                                                />
                                            }
                                        </Paper>
                                    </Box>

                                    <Typography variant={'h5'}
                                                sx={{mt: 2, mr: 5}}>
                                        {answer.content}
                                    </Typography>

                                </Paper>

                            ))}
                        </Stack>

                    </>}
            </Grid>
        </Paper>
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
    </>)
}