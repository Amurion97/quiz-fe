import {Grid} from "@mui/material";
import FilterTest from "./FilterTest";
import FilterType from "./FilterType";
import FilterTag from "./FilterTag";

export function GroupFilter(){
    return(
        <>
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
        </>
    )
}