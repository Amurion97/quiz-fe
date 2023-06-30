import {Box, CardActionArea, Grid, Paper, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icons from "../../../components/ResulTest/Icons";
import ResulTest from "../../../components/ResulTest/ResultTest";
import Tags from "../../../components/ResulTest/Tags";
import { useState } from "react";

export default function TestStatisticPage() {
        const [accurac,setAccurac]=useState(0)
        const [question,setQuestion]=useState(0)
        const [answer,setAnswer]=useState(0)
    return (
        <>
            <Grid container spacing={4} sx={{ mt: 9, px: 3 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid  xs={8}>
                                        <Tags />
                                    </Grid>
                                    <Grid  xs={4} spacing={4} sx={{pl:13,pt:"10px"}}>
                                        <Icons 
                                        accurac={accurac}
                                        question={question}
                                        answer={answer}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <ResulTest 
                                        setAccurac={setAccurac}
                                        setQuestion={setQuestion}
                                        setAnswer={setAnswer}
                                        />

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
