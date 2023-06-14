import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import {Pagination} from "@mui/lab";

export default function QuestionListManagement({selectedTagIDs, setCurrentQuestion, listQuestion}) {

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    return (
        <>
            <Stack spacing={1}>
                <Pagination
                    count={Math.ceil(listQuestion.length / rowsPerPage)}
                    page={page} onChange={handleChangePage}/>
                {
                    listQuestion.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((item) => {
                        const {
                            id,
                            difficulty,
                            tags,
                            content,
                            answers,
                            type,
                        } = item;
                        return (
                            <Card onClick={(e) => {
                                setCurrentQuestion(item);
                            }}>
                                <CardContent>

                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Độ khó: {difficulty.name}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Dạng câu hỏi: {type.name}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Liên
                                        quan: {tags.reduce((accumulator, currentValue) => accumulator + currentValue.name + ", ",
                                        "",)}
                                    </Typography>

                                    <Typography variant="h6" component="div">
                                        Đề bài: {content}
                                    </Typography>
                                    {/*<Divider/>*/}
                                    {/*<List>*/}
                                    {/*    {answers.map((item) => (*/}
                                    {/*        <ListItem>*/}
                                    {/*            <ListItemIcon>*/}
                                    {/*                {item.isTrue === false ?*/}
                                    {/*                    <ClearIcon sx={{color: "red"}}></ClearIcon> :*/}
                                    {/*                    <CheckIcon sx={{color: "green"}}></CheckIcon>}*/}
                                    {/*            </ListItemIcon>*/}
                                    {/*            <ListItemText primary={item.content}/>*/}
                                    {/*        </ListItem>*/}
                                    {/*    ))}*/}
                                    {/*</List>*/}
                                </CardContent>
                            </Card>
                        )
                    })
                }

            </Stack>


        </>

    )
}