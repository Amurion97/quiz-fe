import {Box, Button, Grid, Paper, Radio, Stack, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {alpha, useTheme} from "@mui/material/styles";

const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];

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
    return (<>
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
                ))}
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
                    Previous
                </Button>}
            {currentQuestionIndex === totalQuestion - 1 ?
                <Button variant="contained" size='large' sx={{fontSize: 20,}}
                        onClick={() => {
                            submitForm()
                            handleNextQuestion()
                        }}
                >
                    Submit
                </Button>
                :
                <Button variant="contained" size='large' sx={{fontSize: 20,}}
                        onClick={handleNextQuestion}
                >
                    Next
                </Button>}
        </Stack>
    </>)
}