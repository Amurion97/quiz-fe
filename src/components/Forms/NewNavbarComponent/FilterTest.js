import React, { useState } from "react";
import {FormControlLabel, Grid, Paper} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
    },
}));

const FilterTest = (props) => {
    const classes = useStyles();


    const [checkedValues, setCheckedValues] = useState({
        label: true,
        required: false,
        disabled: false
    });

    const handleCheck = (event) => {
        setCheckedValues({ ...checkedValues, [event.target.name]: event.target.checked });
    };
    console.log(checkedValues,"day la value trong filter Test")

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <FormGroup>
                        {["label", "required", "disabled"].map((criteria) => (
                            <FormControlLabel
                                key={criteria}
                                control={<Checkbox checked={checkedValues[criteria]} onChange={handleCheck} name={criteria} />}
                                label={criteria}
                            />
                        ))}
                    </FormGroup>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default FilterTest;