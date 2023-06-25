import {Grid, Paper, Radio, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useTheme} from "@mui/material/styles";

const BG_COLOR = ["#2BA687", "#1976D2", "#F0A001", "#F200BE", "#CD1E3F"];
export function QuestionInAction({currentQuestion,handleAnswerClick, currentAnswerList }) {
    const theme = useTheme()
    return (<>
        <Paper
            sx={{
                backgroundColor: theme.palette.primary.light,
                height: '100%',
            }}
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
                            }}
                            elevation={3}
                        >
                            <Paper sx={{
                                borderRadius: `${currentQuestion.type.id <= 2 ? "50%" : theme.shape.borderRadius}`,
                                mr: 1,
                                mt: 0.5,
                                mb: 1,
                                height: '48px',
                                width: '48px',
                            }}>
                                {currentQuestion.type.id <= 2 ?
                                    <Radio
                                        onClick={() => {
                                            handleAnswerClick(answer.id)
                                        }
                                        }
                                        checked={currentAnswerList === answer.id}
                                    />
                                    :
                                    <Checkbox
                                        checked={currentAnswerList.includes(answer.id)}
                                        color="success"
                                        onClick={() => {
                                            handleAnswerClick(answer.id)
                                        }
                                        }

                                    />
                                }
                            </Paper>


                            <Typography variant={'h5'}>
                                {answer.content}
                            </Typography>

                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    </>)
}