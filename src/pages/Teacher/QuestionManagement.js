import {Box, Grid, IconButton, Paper, Popover, TextField, Typography} from "@mui/material";
import {GroupFilter} from "../../components/Question/GroupFilter";
import {useEffect, useState} from "react";
import QuestionListManagement from "../../components/Question/QuestionListManagement";
import QuestionDetails from "../../components/Question/QuestionDetails";
import {customAPIv1} from "../../features/customAPI";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {Pagination} from "@mui/lab";

export default function QuestionManagement() {
    console.log("component is rendering")

    const [selectedTagIDs, setSelectedTagIDs] = useState([]);
    const [selectedTypesIDs, setSelectedTypesIDs] = useState([]);
    const [difficultiesIDs, setDifficulties] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [listQuestion, setListQuestion] = useState([]);
    const [contentQuery, setContentQuery] = useState('');
    const [page, setPage] = useState(1);
    const [resultNumber, setResultNumber] = useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDown, setOpenDown] = useState(true);
    console.log("openDown:", openDown)
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setPage(1)
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery])
    const rowsPerPage = 4;
    // console.log("selectedTagIDs:", selectedTagIDs)
    // console.log("selectedType:", selectedTypesIDs)
    // console.log("selectedDifficulties:", difficultiesIDs);

    const handleCheckTags = (event) => {
        const {name} = event.target;
        let index = selectedTagIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTagIDs([...selectedTagIDs, parseInt(name)]);
        } else {
            selectedTagIDs.splice(index, 1);
            setSelectedTagIDs([...selectedTagIDs]);
        }
    };
    const handleCheckTypes = (event) => {
        const {name} = event.target;
        let index = selectedTypesIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTypesIDs([...selectedTypesIDs, parseInt(name)]);
        } else {
            selectedTypesIDs.splice(index, 1);
            setSelectedTypesIDs([...selectedTypesIDs]);
        }
    };
    const handleCheckDifficulties = (event) => {
        const {name} = event.target;
        let index = difficultiesIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setDifficulties([...difficultiesIDs, parseInt(name)]);
        } else {
            difficultiesIDs.splice(index, 1);
            setDifficulties([...difficultiesIDs]);
        }

    };


    const updateQuestions = () => {
        customAPIv1().get(`/questions`, {
            params: {
                content: contentQuery,
                selectedTagIDs: selectedTagIDs,
                selectedTypesIDs: selectedTypesIDs,
                difficultiesIDs: difficultiesIDs,
                page: page,
                rows: rowsPerPage,
            }
        })
            .then(res => {
                console.log("questions:", res.data);
                setListQuestion(res.data.data['questions']);
                setResultNumber(res.data.data['questionCount']);
            })
            .catch(e => console.log("error in get questions:", e))
    };
    useEffect(() => {
        console.log("QuestionManagement  did mount");
        updateQuestions();
        return () => {
            console.log('useEffect return ')
        }
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery, page])

    const handleInputChange = (event) => {
        setContentQuery(event.target.value);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        let currentTargetRect = event.currentTarget.getBoundingClientRect();
        console.log(currentTargetRect.left, currentTargetRect.top, window.innerHeight / 2);
        if (currentTargetRect.top > window.innerHeight / 2) {
            setOpenDown(false);
        } else {
            setOpenDown(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100vh',
                p: {xs: 1, sm: 2, md: 3},
                pt: {xs: 7, sm: 5, md: 3}

            }}>

                <Grid container spacing={3}
                      justifyContent="space-around">
                    <Grid item xs={12} sm={4} md={3}>
                        <Paper
                            component="form"
                            sx={{p: '2px 4px', display: 'flex', alignItems: 'center',}}
                        >
                            <IconButton
                                type="button"
                                sx={{p: '10px'}}
                                aria-label="search" disabled>
                                <SearchIcon/>
                            </IconButton>
                            <TextField
                                variant="standard"
                                sx={{flex: 1, width: 200}}
                                placeholder="Search Here"
                                inputProps={{'label': 'search '}}
                                onChange={handleInputChange}
                                value={contentQuery}
                            />

                        </Paper>

                        <GroupFilter
                            handleCheckTags={handleCheckTags} selectedTagIDs={selectedTagIDs}
                            handleCheckTypes={handleCheckTypes} selectedTypesIDs={selectedTypesIDs}
                            handleCheckDifficulties={handleCheckDifficulties} difficultiesIDs={difficultiesIDs}

                        >
                        </GroupFilter>
                    </Grid>

                    <Grid item xs={12} sm={8} md={4}>
                        <Pagination
                            count={Math.ceil(resultNumber / rowsPerPage)}
                            page={page} onChange={handleChangePage}
                            sx={{width: '100%'}}
                        />
                        <QuestionListManagement
                            setCurrentQuestionId={setCurrentQuestionId}
                            listQuestion={listQuestion}
                            openOnClick={true}
                            handleClick={handleClick}
                        />
                    </Grid>

                    <Grid item md={5}
                          sx={{
                              display: {
                                  xs: 'none',
                                  md: 'inherit'
                              }
                          }}>
                        <QuestionDetails
                            currentQuestionId={currentQuestionId}
                            updateQuestions={updateQuestions}/>
                    </Grid>

                </Grid>
            </Box>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: openDown ? 'top' : 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: openDown ? 'top' : 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    display: {
                        md: 'none'
                    }
                }}
            >
                <QuestionDetails
                    currentQuestionId={currentQuestionId}
                    updateQuestions={updateQuestions}/>
            </Popover>
        </>
    );
}
