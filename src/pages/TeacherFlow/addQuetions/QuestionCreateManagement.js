import {Box, Grid, IconButton, Paper} from "@mui/material";
import {GroupFilter} from "../../../components/Question/GroupFilter"
import {useEffect, useState} from "react";
import QuestionListManagement from "../../../components/Question/QuestionListManagement";
import QuestionDetails from "../../../components/Question/QuestionDetails";
import {customAPIv1} from "../../../features/customAPI";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {Pagination} from "@mui/lab";

export default function QuetionCreateManagement() {
    const [selectedTagIDs, setSelectedTagIDs] = useState([]);
    const [selectedTypesIDs, setSelectedTypesIDs] = useState([]);
    const [difficultiesIDs, setDifficulties] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [listQuestion, setListQuestion] = useState([]);
    const [contentQuery, setContentQuery] = useState('');
    const [page, setPage] = useState(1);
    const [resultNumber, setResultNumber] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
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
        const {name, checked} = event.target;
        let index = selectedTagIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTagIDs([...selectedTagIDs, parseInt(name)]);
        } else {
            selectedTagIDs.splice(index, 1);
            setSelectedTagIDs([...selectedTagIDs]);
        }
    };
    const handleCheckTypes = (event) => {
        const {name, checked} = event.target;
        let index = selectedTypesIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTypesIDs([...selectedTypesIDs, parseInt(name)]);
        } else {
            selectedTypesIDs.splice(index, 1);
            setSelectedTypesIDs([...selectedTypesIDs]);
        }
    };
    const handleCheckDifficulties = (event) => {
        const {name, checked} = event.target;
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
        console.log("edit form did mount");
        updateQuestions();
    }, [selectedTagIDs, selectedTypesIDs, difficultiesIDs, contentQuery, page])

    const handleInputChange = (event) => {
        setContentQuery(event.target.value);
    };
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            p: 3,

        }}>

            <Grid container spacing={3}>
                <Grid item xs={3}>
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
                        <InputBase
                            sx={{ml: 3, flex: 1, width: 200}}
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

                <Grid item xs={4}>
                    <Pagination
                        count={Math.ceil(resultNumber / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        // onMouseOver={handleMouseOver}
                    />
                    <QuestionListManagement
                        setCurrentQuestionId={setCurrentQuestionId}
                        listQuestion={listQuestion}/>
                </Grid>

                <Grid item xs={5}>
                    <QuestionDetails
                        currentQuestionId={currentQuestionId}
                        updateQuestions={updateQuestions}/>
                </Grid>

            </Grid>
        </Box>
    );
}
