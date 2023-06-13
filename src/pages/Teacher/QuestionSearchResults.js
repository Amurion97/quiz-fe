import {Grid} from "@mui/material";
import FilterTest from "../../components/Forms/NewNavbarComponent/FilterTest";
import QuestionList from "../../components/Question/QuestionList";
import FilterType from "../../components/Forms/NewNavbarComponent/FilterType";
import FilterTag from "../../components/Forms/NewNavbarComponent/FilterTag";

export default function QuestionSearchResults() {

    return (
        <Grid container spacing={3} sx={{
            height: '90vh',
        }}>
            <Grid item xs={2}>

                <Grid container>
                    <Grid item xs={12}>
                        <FilterTest>
                        </FilterTest>
                    </Grid>
                    <Grid item xs={12}>
                        <FilterType>
                        </FilterType>
                    </Grid>
                    <Grid item xs={12}>
                        <FilterTag>
                        </FilterTag>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={4}>
                <QuestionList>
                </QuestionList>
            </Grid>

            <Grid item xs={6}>

            </Grid>

        </Grid>
    );
}
