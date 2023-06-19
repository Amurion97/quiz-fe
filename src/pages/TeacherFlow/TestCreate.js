import {Card, CardContent, CardMedia, Grid, IconButton, Paper, Typography} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import AlarmIcon from "@mui/icons-material/Alarm";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from "react";

export default function TestCreatePage() {
    return (
        <>
            <Grid container sx={{p:10}}>
                <Grid item xs={2} >
                    <Card>
                        <CardMedia
                            component="img"
                            height="194"
                            image="https://img4.thuthuatphanmem.vn/uploads/2020/05/07/hinh-anh-cute-dep-nhat_093404024.jpg"
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Tên bài thi ........
                            </Typography>
                            <Grid container>
                                <Grid item xs={8} sx={{pb: '24px'}} textAlign={"center"}>
                                    <CardHeader
                                        title="12312s"
                                        subheader="Time/ques"
                                    />
                                </Grid>
                                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center',}}>
                                    <CardActions disableSpacing>
                                        <AlarmIcon
                                            sx={{fontSize: 48, color: "blue"}}/>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4.5} >
                    <Paper sx={{p:"20px"}}>
                            <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex',}}>
                                <FormatListBulletedIcon sx={{mr:"10px"}} /> Questions
                            </Typography>
                        <Paper elevation={3} sx={{p:"10px"}}>
                            <Grid container sx={{pl:"20px" ,display: 'flex',  alignItems: 'center'}}>
                                <Grid item xs={10} sx={{justifyContent: 'flex-start'}} >
                                    <Typography gutterBottom variant="inherit" component="div" >
                                        Question 1
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} sx={{justifyContent: 'flex-end', ml:"20px"}} >
                                    <IconButton aria-label="delete">
                                        <DeleteForeverTwoToneIcon sx={{color:'#E33F5E'}} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="https://img4.thuthuatphanmem.vn/uploads/2020/05/07/hinh-anh-cute-dep-nhat_093404024.jpg"
                                    alt="Paella dish"
                                />
                            </Card>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item xs={5.5} >

                </Grid>
            </Grid>
        </>
    )
}