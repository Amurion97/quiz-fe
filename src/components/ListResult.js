import {Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import Search from "./Forms/NewNavbarComponent/Search";
import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Select, MenuItem} from '@mui/material';

export function ListResult() {
    const useStyles = makeStyles((theme) => ({
        select: {
            minWidth: 120,
        },
    }));
    const classes = useStyles();
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <Grid container spacing={1}>
                <Grid item spacing={2} xs={11}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Search/>
                        </Grid>
                        <Grid item >
                            <Select value={value} onChange={handleChange} className={classes.select}>
                                <MenuItem value="option1">Option 1</MenuItem>
                                <MenuItem value="option2">Option 2</MenuItem>
                                <MenuItem value="option3">Option 3</MenuItem>
                                <MenuItem value="option4">Option 4</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    day la menu
                </Grid>
            </Grid>
        </>
    );
}