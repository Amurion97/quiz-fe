import {Helmet} from "react-helmet-async";
import {alpha, styled, useTheme} from "@mui/material/styles";
import {Avatar, Grid, Paper, Radio, FormControlLabel, RadioGroup} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
//MUI icon
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AlarmIcon from '@mui/icons-material/Alarm';
//React
import React, {useEffect, useState} from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {customAPIv1} from "../../features/customAPI";


const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));
const StyledSection = styled('div')(({theme}) => ({
    width: '100%',
    // maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // boxShadow: theme.customShadows.card,
    // backgroundColor: theme.palette.background.default,
    // backgroundColor: '#f9fafb',
}));

export default function TestResultPage() {
    const [listQuestion, setListQuestion] = useState([]);
    useEffect(() => {
        customAPIv1().get(`/questions`)
            .then(res => {
                console.log("questions:", res.data);
                setListQuestion(res.data.data);
            })
            .catch(e => console.log("error in get questions:", e))
    }, [])

    const [studenQuiz, setStudenQuiz] = useState([]);
    const theme = useTheme()
    // const [showTable, setShowTable] = useState(false);
    //
    // const handleContentClick = () => {
    //     setShowTable(true);
    // };
    // const CloseHandleContentClick = () => {
    //     setShowTable(false);
    // };
    const [openQuestionIDs, setOpenQuestionIDs] = useState([]);

    const handleContentClick = (questionId) => {
        setOpenQuestionIDs((openingQuestions) => {
            // console.log("openQsIds:", openingQuestions)
            if (openingQuestions.includes(questionId)) {
                return openingQuestions.filter(
                    (id) => {
                        console.log("id", id)
                        console.log("questionId", questionId)
                        return id !== questionId
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

            <StyledRoot>
                <StyledSection>
                    <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                        Test Result
                    </Typography>
                    <Grid container spacing={3} sx={{
                        p: 10,
                    }}>
                        <Grid item xs={4}>
                            <Card>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{bgcolor: 'red.500'}} aria-label="recipe">
                                                    PL
                                                </Avatar>
                                            }
                                            title="Phong"
                                            subheader="September 14, 2016"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CardActions disableSpacing sx={{justifyContent: 'flex-end'}}>
                                            <IconButton aria-label="share">
                                                <ShareIcon/>
                                            </IconButton>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        This impressive paella is a perfect party dish and a fun meal to cook together
                                        with your
                                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Paper elevation={3} sx={{px: 0, mt: 2, mb: 2, pb: '10px'}}>
                                Accuracy
                                <ProgressBar completed={75}
                                             maxCompleted={100}
                                             height={28}
                                             bgColor={theme.palette.primary.main}
                                />
                            </Paper>
                            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}
                                  justifyContent={'center'}>
                                <Grid item xs={6}>
                                    <Card>
                                        <Grid container>
                                            <Grid item xs={8} sx={{pb: '24px'}} textAlign={"center"}>
                                                <CardHeader
                                                    title="6"
                                                    subheader="Correct"
                                                />
                                            </Grid>
                                            <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center',}}>
                                                <CardActions disableSpacing>
                                                    <TaskAltIcon
                                                        sx={{fontSize: 48, color: theme.palette.success.main}}/>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        <Grid container>
                                            <Grid item xs={8} sx={{pb: '24px'}} textAlign={"center"}>
                                                <CardHeader
                                                    title="6"
                                                    subheader="Incorrect"
                                                />
                                            </Grid>
                                            <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center',}}>
                                                <CardActions disableSpacing>
                                                    <HighlightOffIcon
                                                        sx={{fontSize: 48, color: theme.palette.error.main}}

                                                    />
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container>
                                            <Grid item xs={8} sx={{pb: '24px'}} textAlign={"center"}>
                                                <CardHeader
                                                    title="12312s"
                                                    subheader="Time/ques"
                                                />
                                            </Grid>
                                            <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center',}}>
                                                <CardActions disableSpacing>
                                                    <AlarmIcon sx={{fontSize: 48, color: theme.palette.primary.main}}/>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={8}>
                            <Paper sx={{
                                p: '28px'
                            }}>
                                <Typography variant="body1" fontWeight="bold">
                                    Review Questions
                                </Typography>
                                <Typography variant="body1">
                                    Click on the questions to see answers
                                </Typography>
                                {listQuestion.map((item, index) => (
                                    <Card elevation={3} sx={{
                                        px: 0, mt: 2, mb: 2,
                                        // pb: '10px'
                                    }} key={item.id}>
                                        <Grid container

                                              onClick={() => {
                                                  handleContentClick(item.id)
                                              }}>
                                            <Grid item xs={0.5}
                                                  sx={{bgcolor: item.value ? theme.palette.success.main : theme.palette.error.main}}/>
                                            <Grid item xs={11.5}>
                                                <CardContent>
                                                    <Typography variant="body2" sx={{pl: 4}}>
                                                        Câu hỏi {index + 1}: {item.content}
                                                    </Typography>
                                                    <hr/>
                                                </CardContent>
                                                {openQuestionIDs.includes(item.id) && (
                                                    <Grid item xs={12} sx={{pl: 1.4}}>
                                                        <RadioGroup sx={{
                                                            mb: 2
                                                        }}>
                                                            {item.answers.map((item1) => (

                                                                <FormControlLabel
                                                                    key={item1.id}
                                                                    value={item1.id}
                                                                    control={<Radio/>}
                                                                    label={item1.content}
                                                                    checked={item1.isTrue === true}
                                                                    // sx={{bgcolor:alpha(theme.palette.success.main,0.5)}}
                                                                    sx={{bgcolor: item1.isTrue === true ? theme.palette.success.light : ''}}
                                                                />

                                                            ))}
                                                        </RadioGroup>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))}
                            </Paper>
                        </Grid>
                    </Grid>

                </StyledSection>


            </StyledRoot>

        </>
    )
}