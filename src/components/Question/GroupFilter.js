import {Grid} from "@mui/material";
import FilterDifficulty from "../Forms/Filters/FilterDifficulty";
import FilterTypes from "../Forms/Filters/FilterType";
import FilterTags from "../Forms/Filters/FilterTag";
import SimpleBar from "simplebar-react";

export function GroupFilter({
                                handleCheckDifficulties,
                                handleCheckTypes,
                                handleCheckTags,
                                selectedTagIDs,
                                difficultiesIDs,
                                selectedTypesIDs
                            }) {
    return (
        <>
            <SimpleBar style={{
                maxHeight: '90vh',
            }}>


                <Grid container>
                    <Grid item xs={12}>
                        <FilterDifficulty handleCheckDifficulties={handleCheckDifficulties}
                                          difficultiesIDs={difficultiesIDs}>
                        </FilterDifficulty>
                    </Grid>
                    <Grid item xs={12}>
                        <FilterTypes handleCheckTypes={handleCheckTypes} selectedTypesIDs={selectedTypesIDs}>
                        </FilterTypes>
                    </Grid>
                    <Grid item xs={12}>
                        <FilterTags handleCheckTags={handleCheckTags} selectedTagIDs={selectedTagIDs}>
                        </FilterTags>
                    </Grid>
                </Grid>
            </SimpleBar>
        </>
    )
}

