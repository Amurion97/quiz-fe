import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";

export default function QuestionList() {
    const [listQuestion, setListQuestion] = useState([]);

    useEffect(() => {
        console.log("edit form did mount");
        customAPIv1().get(`/questions`)
            .then(res => {
                console.log("questions:", res.data);
                setListQuestion(res.data.data);
            })
            .catch(e => console.log("error in get users:", e))
    }, [])
    console.log(listQuestion)

    return (
        <>
            <Stack spacing={1}>
                {
                    listQuestion.map((item) => {
                        const {
                            id,
                            difficulty,
                            tags,
                            content,
                            answers,
                            type,
                        } = item;
                        return (
                            <Card sx={{width: '80%'}}>
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Dạng câu hỏi: {type.name}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Độ khó: {difficulty.name}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Liên
                                        quan: {tags.reduce((accumulator, currentValue) => accumulator + currentValue.name + ", ",
                                        "",)}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        Đề bài: {content}
                                    </Typography>
                                    <Divider/>
                                    <List>
                                        {answers.map((item) => (
                                            <ListItem>
                                                <ListItemIcon>
                                                    {item.isTrue === false ?
                                                        <ClearIcon sx={{color: "red"}}></ClearIcon> :
                                                        <CheckIcon sx={{color: "green"}}></CheckIcon>}
                                                </ListItemIcon>
                                                <ListItemText primary={item.content}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Stack>
        </>

    )
}