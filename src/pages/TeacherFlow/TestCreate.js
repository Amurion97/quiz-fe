import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import AlarmIcon from "@mui/icons-material/Alarm";
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
                                Tên bài thi
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
                    <p>123123</p>
                </Grid>
                <Grid item xs={5.5} >
                    <p>123123</p>
                </Grid>
            </Grid>
        </>
    )
}