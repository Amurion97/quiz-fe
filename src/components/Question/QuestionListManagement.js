import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';

export default function QuestionListManagement({setCurrentQuestionId, listQuestion}) {
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
                            <Card key={id} onClick={(e) => {
                                setCurrentQuestionId(id);
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

                                </CardContent>
                            </Card>
                        )
                    })
                }

            </Stack>


        </>

    )
}