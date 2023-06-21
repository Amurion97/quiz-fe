import {Avatar, Box, Card, CardContent, Grid, Paper, Typography} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

//icon mui
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';

export default function GroupTest() {
    return (
        <>
            <Paper>
                <Grid container sx={{p: 10,  justifyContent: "center", alignItems: "center"}} >
                    <Grid container spacing={3} sx={{pb:3}} >
                        <Grid item xs={9} >
                            <Card sx={{pb: "24px", height: "100%"}}>
                                <CardHeader
                                    avatar={<Avatar src="/assets/images/avatars/avatar_default.jpg" alt="photoURL"/>}
                                    title="GGG"
                                    subheader="You"
                                />
                            </Card>
                        </Grid>

                        <Grid item xs={3}>
                            <Card
                                sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        JOIN CODE
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        123123
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="body1">
                                Waiting for the host to start....
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Card sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                                <Box style={{display: "flex", alignItems: "center"}}>
                                    <GroupsTwoToneIcon/>
                                    <Typography sx={{ml: "4px"}}>2</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>


                </Grid>
            </Paper>

        </>
    )
}