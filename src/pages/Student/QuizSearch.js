import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {customAPIv1} from "../../features/customAPI";
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
import {useEffect, useState} from "react";


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
    const [listTest, setListTest] = useState([]);
    useEffect(()=>{
        customAPIv1().get("/tests").then(res=>{
            setListTest(res.data.data.tests)
        })
    }, [])
    console.log("listTest", listTest);
    
    return (
        <Grid container spacing={2} sx={{ px: 2 }}>
            <Grid item xs={8}>
                <Grid container spacing={1.25}>
                    {listTest.map((item, index) => {
                        const {
                            name, 
                            image
                        } = item
                        return (
                        <Grid item xs={3}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div">
                                            {name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )})}
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
