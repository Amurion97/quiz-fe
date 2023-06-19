import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Input,
    Paper,
    Typography,
    Autocomplete,
    TextField
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import AlarmIcon from "@mui/icons-material/Alarm";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React, {useEffect, useState} from "react";
import QuestionCreateManagement from "./addQuetions/QuestionCreateManagement";
import {customAPIv1} from "../../features/customAPI";

export default function TestCreatePage() {
    const [tags, setTags] = useState([]);
    useEffect(() => {
        customAPIv1().get("/tags")
            .then(res => {
                console.log("tags:", res.data.data);
                setTags(res.data.data.map(item => {
                    return {
                        name: item.name,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get tags:", e))
    }, [])
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
                                <Input
                                    label="Search Here"
                                    placeholder="Test Name"
                                    sx={{
                                        ml: 3,
                                        flex: 1,
                                        width: 200,
                                        '& input': {
                                            textAlign: 'center',
                                            fontWeight: 'bolder',
                                            fontSize: '1.5em',
                                            textOverflow: 'ellipsis',
                                        },
                                    }}
                                />
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
                            <Grid item xs={12}>
                                <Paper sx={{ p: 1 }}>
                                    <Autocomplete
                                        name="tags"
                                        multiple
                                        options={tags}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="tag"
                                                label="Tags"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Paper>
                            </Grid>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={4} >
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
                                <Grid item xs={1} sx={{justifyContent: 'flex-end', ml:"20px",}} >
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
                <Grid item xs={6} >
                    <QuestionCreateManagement/>
                </Grid>
            </Grid>
        </>
    )
}