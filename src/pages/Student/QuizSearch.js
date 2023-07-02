//React
import * as React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
//M-UI
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {Card} from "@mui/material";
import {CardActionArea} from "@mui/material";
import {CardActions} from "@mui/material";
import {CardContent} from "@mui/material";
import {CardMedia} from "@mui/material";
import {Dialog} from "@mui/material";
import {Paper} from "@mui/material";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
//
import {auto} from "@popperjs/core";
//feature
import {customAPIv1} from "../../features/customAPI";
//layouts
import {NameContext} from "../../layouts/StudentLayout";
//component
import {CodeEnterBox} from "../../components/CodeEnterBox";
import SimpleBar from "simplebar-react";
import {Skeleton} from "@mui/material";

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

    const [searchParams] = useSearchParams();
    const roomCode = searchParams.get("code");
    console.log("roomCode:", roomCode);

    const [currentTestId, setCurrentTestId] = useState(null);
    const [currentTest, setCurrentTest] = useState();
    const [listTest, setListTest] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoadingChosenTest, setIsLoadingChosenTest] = useState(true);
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
    console.log("Test", listTest)
    useEffect(() => {
        if (currentTestId) {
            customAPIv1()
                .get(`/tests/${currentTestId}`)
                .then((res) => {
                    console.log(`res`, res);
                    setCurrentTest(res.data.data);
                    setIsLoadingChosenTest(false);
                });
        }

    }, [currentTestId]);
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} sx={{
                    px: {
                        xs: 5,
                        md: 10
                    }
                }}>
                    <CodeEnterBox code={roomCode}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} sx={{
                        pl: {
                            xs: 5,
                            md: 10
                        }, pr: {
                            xs: 5,
                            md: 10
                        }, pb: {
                            xs: 5,
                            md: 10
                        }
                    }}>
                        {listTest.map((item, index) => {
                            const {id, name, image, details, attempts} = item;
                            return (
                                <Grid key={id} item xs={12} sm={6} md={4} lg={12 / 5}>
                                    <Card
                                        onClick={() => {
                                            setCurrentTestId(id);
                                            setOpenDialog(true);
                                        }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140px"
                                                src={image}
                                                onError={(event) => {
                                                    console.log('error img:', event.target.src);
                                                    event.target.src = `/assets/images/default-cover.webp`
                                                }}
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="div" sx={{
                                                    "display": "-webkit-box",
                                                    "maxHeight": "3.2rem",
                                                    "WebkitBoxOrient": "vertical",
                                                    "overflow": "hidden",
                                                    "textOverflow": "ellipsis",
                                                    "whiteSpace": "normal",
                                                    "WebkitLineClamp": "1",
                                                    "lineHeight": "1.6rem"
                                                }}>
                                                    {name}
                                                </Typography>
                                                <hr/>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <Typography fontSize={13}>
                                                            {details.length} Câu hỏi
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Typography fontSize={13} sx={{textAlign: "end"}}>
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
            <Dialog open={openDialog} onClose={() => {
                handleCloseDialog()
                setIsLoadingChosenTest(true)
            }} maxWidth="md">

                <SimpleBar style={{maxHeight: '90vh'}}>

                    <Card sx={{width: {xs: 310, sm: 400, md: 550, lg: 700}}}>

                        {isLoadingChosenTest
                            ? <>
                                {/* For variant="text", adjust the height via font-size */}
                                {/*<Skeleton variant="text" sx={{fontSize: '1rem'}}/>*/}

                                {/* For other variants, adjust the size with `width` and `height` */}
                                {/*<Skeleton variant="circular" width={40} height={40}/>*/}
                                <Skeleton variant="rectangular" sx={{height: {xs: 140, sm: 200, md: 250, lg: 250}}}/>
                                <br/>
                                <Skeleton variant="text" sx={{fontSize: '2rem'}}/>
                                <Skeleton variant="text" sx={{fontSize: '0.8rem'}}/>
                                <Skeleton variant="text" sx={{fontSize: '0.8rem'}}/>
                                <br/>
                                <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                                <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                                <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                                <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                            </>
                            : (
                                <>
                                    <CardMedia
                                        component="img"
                                        sx={{height: {xs: 140, sm: 200, md: 250, lg: 250}}}
                                        src={currentTest.image}
                                        onError={(event) => {
                                            console.log('error img:', event.target.src);
                                            event.target.src = `/assets/images/default-cover.webp`
                                        }}
                                    />

                                    <Grid container sx={{pl: 2, pr: 2}}>
                                        <Grid item xs={4} lg={1.5} sx={{textAlign: "center"}}>
                                            <Paper elevation={2} fontSize={15}>
                                                {currentTest.details.length} Câu hỏi
                                            </Paper>
                                        </Grid>
                                        <Grid item xs></Grid>
                                        <Grid item xs={4} lg={2} sx={{textAlign: "center"}}>
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

                                        <hr/>

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

                                        <br/>
                                        <SimpleBar style={{maxHeight: '20vh'}}>
                                            {currentTest.details &&
                                                currentTest.details
                                                    .slice(0, 3)
                                                    .map((item, index) => (
                                                        <Typography key={item.id}>
                                                            {index + 1}. {item.question.content}
                                                        </Typography>
                                                    ))
                                            }
                                        </SimpleBar>

                                    </CardContent>


                                </>
                            )}

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

                </SimpleBar>

            </Dialog>

        </>


    );
}
