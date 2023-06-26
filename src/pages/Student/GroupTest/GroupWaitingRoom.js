import {Avatar, Box, Card, CardContent, Divider, Grid, MenuList, Paper, Typography} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

//icon mui
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import {useState} from "react";
import StudentsLounge from "./StudentsLounge";


export default function GroupWaitingRoom() {
    // const [students, setStudents] = useState([])
    return (
        <>
            {/*<Grid container*/}
            {/*      sx={{*/}
            {/*          // p: 20,*/}
            {/*          // display: "flex",*/}
            {/*          justifyContent: "center", alignItems: "center", maxHeight: "200%"*/}
            {/*      }}>*/}
            {/*    <Grid item xs={6}*/}
            {/*          sx={{transform: "scale(2)"}}*/}
            {/*    >*/}

            <Box
                // container
                sx={{
                    p: 10,
                    // justifyContent: "center", alignItems: "center",
                    maxWidth: '1200px',
                    margin: 'auto',
                    // transform: "scale(1.2)"
                }}>
                <Grid container
                    // spacing={3}
                      sx={{
                          pb: 3,
                      }}
                >
                    <Grid item xs={8} sx={{pr: 3}}>
                        <Card sx={{
                            // pb: "24px",
                            height: "100%"
                        }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src="/assets/images/avatars/avatar_default.jpg"
                                        alt="photoURL"
                                        sx={{height: '80px', width: '80px'}}
                                    />}
                                title="GGG"
                                subheader="You"
                                titleTypographyProps={{
                                    variant: 'h3'
                                }}
                                subheaderTypographyProps={{
                                    variant: 'h4'
                                }}
                                sx={{
                                    p: 5
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card
                            sx={{
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                                height: "100%",
                                textAlign: 'center',
                            }}>
                            <CardContent
                                sx={{pt: 5}}
                            >
                                <Typography variant="h4" color="text.secondary" gutterBottom>
                                    JOIN CODE
                                </Typography>
                                <Typography variant="h3" component="div">
                                    123123
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container sx={{pb: 10}}>
                    <Grid item xs={10}
                          sx={{
                              display: "flex",
                              alignItems: "center",
                          }}>
                        <Typography variant="h4">
                            Waiting for the host to start....
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Card sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%"
                        }}>
                            <Box sx={{
                                display: "flex", alignItems: "center",
                                py: 1
                            }}>
                                <GroupsTwoToneIcon fontSize='large'/>
                                <Typography variant='h4' sx={{ml: "4px"}}>2</Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>


                {/*{students.length <= 1*/}
                {/*    ? "You are the first in this exam room"*/}
                {/*    : students &&*/}
                {/*    students.map((student) => (*/}
                {/*        <StudentsLounge/>*/}
                {/*))*/}
                {/*}*/}

                <StudentsLounge/>
            </Box>
            {/*    </Grid>*/
            }
            {/*</Grid>*/
            }


        </>
    )
}