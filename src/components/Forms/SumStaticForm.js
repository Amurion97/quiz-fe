import { Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import Icons from "../ResulTest/Icons";
import Tags from "../ResulTest/Tags";
import ResulTest from "../ResulTest/ResultTest";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

// const Item1 = styled(Paper)(({ theme }) => ({

//     textAlign: "center",
// }));
const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#7a1fa2",
    textAlign: "center",
}));

export default function SumStatisticForm() {
    return (
        <>
            <Grid item xs={12}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Tags />
                                </Grid>
                                <Grid item xs={5}>
                                        <Icons />
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
        </>
    );
}
