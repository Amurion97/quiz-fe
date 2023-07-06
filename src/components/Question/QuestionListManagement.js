//React
import * as React from 'react';
import SimpleBar from 'simplebar-react';
//Mui
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import {IconButton, Paper, useMediaQuery} from "@mui/material";
//Mui-icon
import FileDownloadDoneTwoToneIcon from '@mui/icons-material/FileDownloadDoneTwoTone';


export default function QuestionListManagement({
                                                   setCurrentQuestionId,
                                                   listQuestion,
                                                   openOnClick,
                                                   addToQuestionList,
                                                   handleClick
                                               }) {
    const isMd = useMediaQuery(theme => theme.breakpoints.up('md'))
    const props = (id) => {
        return {
            [openOnClick ? 'onClick' : 'onMouseOver']: (e) => {
                console.log("question id", id)
                setCurrentQuestionId(id);
                if (handleClick) {
                    handleClick(e)
                }

            }
        }
    }
    return (
        <>
            <SimpleBar style={{maxHeight: isMd ? "85vh" : '200vh'}}>

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
                                    {!openOnClick && (
                                        <Paper sx={{position: 'absolute', top: 0, right: 0}}>
                                            <IconButton onClick={() => addToQuestionList(id)}>
                                                <FileDownloadDoneTwoToneIcon/>
                                            </IconButton>
                                        </Paper>
                                    )}
                                    <CardContent>
                                        <Typography sx={{fontSize: 14}} color="text.secondary"
                                                    gutterBottom>
                                            Độ khó: {difficulty.name}
                                        </Typography>
                                        <Typography sx={{fontSize: 14}} color="text.secondary"
                                                    gutterBottom>
                                            Dạng câu hỏi: {type.name}
                                        </Typography>
                                        <Typography sx={{fontSize: 14}} color="text.secondary"
                                                    gutterBottom>
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

            </SimpleBar>
        </>
    )
}