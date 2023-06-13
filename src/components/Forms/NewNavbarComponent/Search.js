import {useState} from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () => {
        console.log(searchValue);
    };

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', alignItems: 'center'}}
        >
            <InputBase
                sx={{ml: 3, flex: 1,width : 200}}
                placeholder="Search Here"
                inputProps={{'aria-label': 'search '}}
                onChange={handleInputChange}
                value={searchValue}
            />
            <IconButton type="button" fontSize="small" aria-label="search" onClick={handleSearch}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}







































