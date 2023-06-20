import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { auto } from "@popperjs/core";

const ButtonHover = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.primary.darker,
    textAlign: "center",
    color: theme.palette.primary.darker,
    background: "#fff",
    '&:hover': {
        background: theme.palette.primary.darker,
        color: theme.palette.primary.contrastText
     },
}));

export default function QuizSearch() {
    return (
        <Grid container spacing={2} sx={{ px: 2 }}>
            <Grid item xs={8}>
                <Grid container spacing={1.25}>
                    {[...Array(15)].map((item, index) => (
                        <Grid item xs={3}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`/assets/images/products/product_${
                                            index + 1
                                        }.jpg`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div">
                                            Test {index + 1}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardMedia
                        sx={{ height: 200 }}
                        image="/assets/images/products/product_1.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Test 1
                        </Typography>
                        <hr />
                        <Typography variant="body2" color="text.secondary">
                            Difficulty level: Easy
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ButtonHover
                            variant="outlined"
                            sx={{ marginLeft: auto, marginRight: auto, p: 2 }}>
                            <Typography variant="h4">Let's Get It Started</Typography>
                        </ButtonHover>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
