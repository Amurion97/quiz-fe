import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
const listQuestion = [{
    "id": 1,
    "content": "Hello",
    "answers": [
        {
            "id": 27,
            "content": "13233",
            "isTrue": true
        },
        {
            "id": 28,
            "content": "1333",
            "isTrue": true
        },
        {
            "id": 29,
            "content": "12",
            "isTrue": false
        },
        {
            "id": 30,
            "content": "333",
            "isTrue": true
        },
        {
            "id": 31,
            "content": "444",
            "isTrue": false
        }
    ],
    "type": {
        "id": 3,
        "name": "More than one correct option"
    },
    "tags": [
        {
            "id": 21,
            "name": "GGG123"
        },
        {
            "id": 22,
            "name": "GGG1234"
        }
    ],
    "difficulty": {
        "id": 2,
        "name": "Medium"
    }
}, {
    "id": 2,
    "content": "Hello",
    "answers": [
        {
            "id": 27,
            "content": "13233",
            "isTrue": true
        },
        {
            "id": 28,
            "content": "1333",
            "isTrue": true
        },
        {
            "id": 29,
            "content": "12",
            "isTrue": false
        },
        {
            "id": 30,
            "content": "333",
            "isTrue": true
        },
        {
            "id": 31,
            "content": "444",
            "isTrue": false
        }
    ],
    "type": {
        "id": 3,
        "name": "More than one correct option"
    },
    "tags": [
        {
            "id": 21,
            "name": "GGG123"
        },
        {
            "id": 22,
            "name": "GGG1234"
        }
    ],
    "difficulty": {
        "id": 2,
        "name": "Medium"
    }
}, {
    "id": 3,
    "content": "Hello",
    "answers": [
        {
            "id": 27,
            "content": "13233",
            "isTrue": true
        },
        {
            "id": 28,
            "content": "1333",
            "isTrue": true
        },
        {
            "id": 29,
            "content": "12",
            "isTrue": false
        },
        {
            "id": 30,
            "content": "333",
            "isTrue": true
        },
        {
            "id": 31,
            "content": "444",
            "isTrue": false
        }
    ],
    "type": {
        "id": 3,
        "name": "More than one correct option"
    },
    "tags": [
        {
            "id": 21,
            "name": "GGG123"
        },
        {
            "id": 22,
            "name": "GGG1234"
        }
    ],
    "difficulty": {
        "id": 2,
        "name": "Medium"
    }
}, {
    "id": 4,
    "content": "Hello",
    "answers": [
        {
            "id": 27,
            "content": "13233",
            "isTrue": true
        },
        {
            "id": 28,
            "content": "1333",
            "isTrue": true
        },
        {
            "id": 29,
            "content": "12",
            "isTrue": false
        },
        {
            "id": 30,
            "content": "333",
            "isTrue": true
        },
        {
            "id": 31,
            "content": "444",
            "isTrue": false
        }
    ],
    "type": {
        "id": 3,
        "name": "More than one correct option"
    },
    "tags": [
        {
            "id": 21,
            "name": "GGG123"
        },
        {
            "id": 22,
            "name": "GGG1234"
        }
    ],
    "difficulty": {
        "id": 2,
        "name": "Medium"
    }
}
]
export default function QuestionList() {

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
                                                {item.isTrue === false ? <ClearIcon sx={{color:"red"}}></ClearIcon> :
                                                    <CheckIcon sx={{color:"green"}}></CheckIcon>}
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