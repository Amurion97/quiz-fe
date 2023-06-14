import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {
    Button,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {customAPIv1} from "../../features/customAPI";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function QuestionDetails({currentQuestion, updateQuestions}) {
    const [openMenu, setOpenMenu] = useState(null);
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenu(null);
    };



    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    let id,
        difficulty,
        tags,
        content,
        answers,
        type
    if (currentQuestion) {
        ({
            id,
            difficulty,
            tags,
            content,
            answers,
            type
        } = currentQuestion);
    }


    return (
        <>
            <Card>
                <CardContent>
                    {!currentQuestion ?
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Choose a question to see details
                        </Typography>
                        :
                        <>
                            <Grid container>
                                <Grid item xs={11}>
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
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={(e) => {
                                            setCurrentQuestionId(id);
                                            handleOpenMenu(e);
                                        }}>
                                        <MoreVertIcon fontSize="small"/>
                                    </IconButton>
                                </Grid>
                            </Grid>

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
                        </>
                    }
                </CardContent>
            </Card>

            <Popover
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{vertical: "top", horizontal: "left"}}
                transformOrigin={{vertical: "top", horizontal: "right"}}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 200,
                        "& .MuiMenuItem-root": {
                            px: 1,
                            typography: "body2",
                            borderRadius: 0.75,
                        },
                    },
                }}>

                <MenuItem
                    onClick={() => {
                        handleCloseMenu();
                    }}>
                    <EditIcon fontSize="small"/>
                    Edit
                </MenuItem>

                <MenuItem
                    sx={{color: "error.main"}}
                    onClick={(e) => {
                        handleCloseMenu();
                        handleClickOpenConfirm();
                    }}>
                    <DeleteOutlineIcon fontSize="small"/>
                    Delete
                </MenuItem>
            </Popover>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this question?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action can not be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button
                        onClick={() => {
                            customAPIv1()
                                .delete(`/questions/${currentQuestionId}`)
                                .then((res) => {
                                    updateQuestions();
                                    handleCloseConfirm();
                                })
                                .catch((e) => {
                                    console.log("error in delete:", e);
                                });
                        }}
                        autoFocus
                        variant="contained"
                        color="error">
                        Remove Question
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}