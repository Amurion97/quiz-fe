//React
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
//M-UI
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Dialog } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
//
import { auto } from "@popperjs/core";
//feature
import { customAPIv1 } from "../../features/customAPI";
//layouts
import { NameContext } from "../../layouts/StudentLayout";
//component
import { CodeEnterBox } from "../../components/CodeEnterBox";

const ButtonHover = styled(Button)(({ theme }) => ({
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
    const [openDialog, setOpenDialog] = useState(false);
    // const handleClickOpenDialog = () => {
    //     setOpenDialog(true);
    // };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

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
                console.log(`res`, res);
                setCurrentTest(res.data.data);
            });
    }, [currentTestId]);
    return (
        <>
            <Grid container spacing={2} sx={{ px: 2 }}>
                <Grid item xs={12}>
                    <CodeEnterBox />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ pl: 10, pr: 10, pb: 10 }}>
                        {listTest.map((item, index) => {
                            const { id, name, image, details, attempts } = item;
                            return (
                                <Grid key={id} item xs={12} lg={12 / 5} >
                                    <Card
                                        onClick={() => {
                                            setOpenDialog(true);
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
                                                <hr />
                                                <Grid container >
                                                    <Grid xs={6}>
                                                        <Typography fontSize={13}>
                                                            {details.length} Câu hỏi
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={6}>
                                                        <Typography fontSize={13} sx={{ textAlign: "end" }}>
                                                            {attempts.length} Lượt làm
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                {currentTest && (
                    <Card sx={{ width: { xs: 310, lg: 700 } }}>
                        <CardMedia
                            sx={{ height: { xs: 140, lg: 250 } }}
                            image={currentTest.image}
                            title="green iguana"
                        />

                        {console.log(`currentTest`, currentTest.details.map(item => item.question.content))}
                        <Grid container sx={{ pl: 2, pr: 2 }}>
                            <Grid item xs={4} lg={1.5} sx={{ textAlign: "center" }}>
                                <Paper elevation={2} fontSize={15}>
                                    {currentTest.details.length} Câu hỏi
                                </Paper>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid item xs={4} lg={2} sx={{ textAlign: "center" }}>
                                <Paper elevation={2} fontSize={15}>
                                    {currentTest.attempts.length} Lượt làm
                                </Paper>
                            </Grid>
                        </Grid>


                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                {currentTest.name}
                            </Typography>

                            <hr />

                            <Typography variant="body2" color="text.secondary">
                                Độ khó: {currentTest.difficulty.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Thẻ : {currentTest.tags.map((tag, index) => {
                                    if (index === currentTest.tags.length - 1) {
                                        return tag.name + "."
                                    } else {
                                        return tag.name + ", ";
                                    }
                                }).join("")}
                            </Typography>

                            <br />

                            {currentTest.details &&
                                currentTest.details
                                    .slice(0, 3)
                                    .map((item, index) => (
                                        <Typography key={item.id}>
                                            {index + 1}. {item.question.content}
                                        </Typography>
                                    ))
                            }

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
            </Dialog>

        </>



    );
}
