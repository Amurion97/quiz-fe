import { CardActionArea, Grid, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icons from "../../../components/ResulTest/Icons";
import ResulTest from "../../../components/ResulTest/ResultTest";
import Tags from "../../../components/ResulTest/Tags";
import { useState } from "react";

export default function TestStatisticPage() {
    const [accurac, setAccurac] = useState(0)
    const [question, setQuestion] = useState(0)
    const [answer, setAnswer] = useState(0)
    const isMobi = useMediaQuery(`(max-width:375px)`)
    return (
        <>
            <Grid container spacing={4} sx={{ mt: 9, px: 3 }}>
                <Grid item xs={12} >
                    <Card>
                        <CardActionArea>
                            <CardContent >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Tags />
                                    </Grid>
                                    <Grid item xs={12} md={4}  >
                                        <Icons sx={{display: "flex", justifyContent: "space-between"}}
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
                <Grid item xs={12}
                 sm={isMobi ? 1 : 12}
                  >
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
