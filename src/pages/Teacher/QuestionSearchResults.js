import {Grid} from "@mui/material";
import FilterTest from "../../components/Forms/NewNavbarComponent/FilterTest";
import QuestionList from "../../components/Question/QuestionList";
import FilterType from "../../components/Forms/NewNavbarComponent/FilterType";
import FilterTag from "../../components/Forms/NewNavbarComponent/FilterTag";
import {GroupFilter} from "../../components/Forms/NewNavbarComponent/GroupFilter";
import {useState} from "react";

export default function QuestionSearchResults() {
    const [selectedTagIDs, setSelectedTagIDs] = useState([]);
    console.log("selectedTagIDs:", selectedTagIDs)
    const handleCheck = (event) => {
        const { name, checked } = event.target;
        let index = selectedTagIDs.findIndex(id => id === parseInt(name));
        if (index < 0) {
            setSelectedTagIDs([...selectedTagIDs, parseInt(name)]);
        } else {
            selectedTagIDs.splice(index, 1);
            setSelectedTagIDs([...selectedTagIDs]);
        }
        // setCheckedValues((prevState) => ({ ...prevState, [name]: checked }));
        // handleFilter();
    };
    return (
        <Grid container spacing={3} sx={{
            height: '90vh',
        }}>
            <Grid item xs={2}>

                <GroupFilter handleCheck={handleCheck}>

                </GroupFilter>

            </Grid>

            <Grid item xs={4}>
                <QuestionList selectedTagIDs={selectedTagIDs}>
                </QuestionList>
            </Grid>

            <Grid item xs={6}>

            </Grid>

        </Grid>
    );
}
