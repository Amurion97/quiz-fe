import {Grid} from "@mui/material";
import QuestionList from "../../components/Question/QuestionList";
import {GroupFilter} from "../../components/Question/GroupFilter";
import {useState} from "react";

export default function QuestionSearchResults() {
    const [selectedTagIDs, setSelectedTagIDs] = useState([]);
    const [selectedTypesIDs, setSelectedTypesIDs] = useState([]);
    const [difficultiesIDs, setDifficulties] = useState([]);
    console.log("selectedTagIDs:", selectedTagIDs)
    console.log("selectedType:", selectedTypesIDs)
    console.log("selectedDifficulties:", difficultiesIDs)
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


    return (
        <Grid container spacing={3} sx={{
            height: '90vh',
        }}>
            <Grid item xs={2}>

                <GroupFilter
                    handleCheckTags={handleCheckTags} selectedTagIDs={selectedTagIDs}
                    handleCheckTypes={handleCheckTypes} selectedTypesIDs={selectedTypesIDs}
                    handleCheckDifficulties={handleCheckDifficulties} difficultiesIDs={difficultiesIDs}
                >
                </GroupFilter>
            </Grid>

            <Grid item xs={4}>
                <QuestionList selectedTagIDs={selectedTagIDs} selectedTypesIDs={selectedTypesIDs}
                              difficultiesIDs={difficultiesIDs}>
                </QuestionList>
            </Grid>

            <Grid item xs={6}>

            </Grid>

        </Grid>
    );
}
