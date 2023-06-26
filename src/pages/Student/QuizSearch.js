import * as React from "react";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {customAPIv1} from "../../features/customAPI";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Paper,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import {auto} from "@popperjs/core";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {NameContext} from "../../layouts/StudentLayout";
import {useNavigate} from "react-router-dom";
import {CodeEnterBox} from "./CodeEnterBox";

const ButtonHover = styled(Button)(({theme}) => ({
    borderColor: theme.palette.primary.darker,
    textAlign: "center",
    color: theme.palette.primary.darker,
    background: "#fff",
    "&:hover": {
        background: theme.palette.primary.darker,
        color: theme.palette.primary.contrastText,
    },
}));

export default function QuizSearch() {
    const inforNeedFind = useContext(NameContext);
    const navigate = useNavigate();
    const [currentTestId, setCurrentTestId] = useState();
    const [currentTest, setCurrentTest] = useState();
    const [listTest, setListTest] = useState([]);
    const showTest = () => {
        customAPIv1()
            .get("/tests", {
                params: {
                    name: inforNeedFind,
                }
            })
            .then((res) => {
                setListTest(res.data.data.tests);
            });
    }
    useEffect(() => {
        showTest();
    }, [inforNeedFind]);

    useEffect(() => {
        customAPIv1()
            .get(`/tests/${currentTestId}`)
            .then((res) => {
                setCurrentTest(res.data.data);
            });
    }, [currentTestId]);
    return (
        <Grid container spacing={2} sx={{px: 2}}>
            <Grid item xs={12}>

                    <CodeEnterBox/>

            </Grid>
            <Grid item xs={8}>
                <Grid container spacing={1.25}>
                    {listTest.map((item, index) => {
                        const {id, name, image} = item;
                        return (
                            <Grid key={id} item xs={3}>
                                <Card
                                    onClick={() => {
                                        setCurrentTestId(id);
                                    }}>
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
                        );
                    })}
                </Grid>
            </Grid>
            <Grid item xs={4}>
                {currentTest && (
                    <Card>
                        <CardMedia
                            sx={{height: 200}}
                            image={currentTest.image}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                {currentTest.name}
                            </Typography>
                            <hr/>
                            <Typography variant="body2" color="text.secondary">
                                Độ khó của câu hỏi: {currentTest.difficulty.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ButtonHover
                                variant="outlined"
                                sx={{
                                    marginLeft: auto,
                                    marginRight: auto,
                                    p: 2,
                                }}
                                onClick={() => {
                                    navigate('/students/test', {
                                        state: {
                                            id: currentTestId
                                        }
                                    })
                                }}
                            >
                                <Typography variant="h4">
                                    Bắt đầu thi
                                </Typography>
                            </ButtonHover>
                        </CardActions>
                    </Card>
                )}
            </Grid>
        </Grid>
    );
}
