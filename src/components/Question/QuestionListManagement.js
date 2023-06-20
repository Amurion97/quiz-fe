import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import FileDownloadDoneTwoToneIcon from '@mui/icons-material/FileDownloadDoneTwoTone';
import {IconButton} from "@mui/material";

export default function QuestionListManagement({setCurrentQuestionId, listQuestion, openOnClick, addToQuestionList}) {
    const props = (id) => {
        return {
            [openOnClick ? 'onClick' : 'onMouseOver']: (e) => {
                console.log("question id", id)
                setCurrentQuestionId(id);
            }
        }
    }
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
                            type,
                        } = item;
                        return (
                            <Card key={id}
                                  {...props(id)}
                            >
                                <IconButton onClick={() => addToQuestionList(id)}>
                                    <FileDownloadDoneTwoToneIcon />
                                </IconButton>
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

                                </CardContent>
                            </Card>
                        )
                    })
                }

            </Stack>


        </>

    )
}