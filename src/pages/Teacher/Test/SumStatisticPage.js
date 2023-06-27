import {Box, CardActionArea, Grid, Paper, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icons from "../../../components/ResulTest/Icons";
import ResulTest from "../../../components/ResulTest/ResultTest";
import Tags from "../../../components/ResulTest/Tags";

export default function TestStatisticPage() {

    return (
        <>
            <Grid container spacing={4} sx={{ mt: 9, px: 3 }}>
                <Grid item xs={12}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={7}>
                                        <Tags />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Icons/>
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

                                        <ResulTest />

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
