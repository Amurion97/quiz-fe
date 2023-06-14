import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import YoutubeSearchedForTwoToneIcon from '@mui/icons-material/YoutubeSearchedForTwoTone';

const FilterTest = () => {
    const [open, setOpen] = useState(true);
    const [checkedValues, setCheckedValues] = useState({
        label: true,
    });

    const handleClick = () => {
        setOpen(!open);
    };

    const handleCheck = (event) => {
        const { name, checked } = event.target;
        setCheckedValues((prevState) => ({ ...prevState, [name]: checked }));
        handleFilter();
    };

    const handleFilter = () => {
        const selectedTypes = Object.keys(checkedValues).filter(
            (key) => checkedValues[key]
        );
        console.log(selectedTypes, 'day la filter ben test');

    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    sx={{ mt: 1 }}
                >
                    Tìm kiếm theo loại noi dung
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <YoutubeSearchedForTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Tìm kiếm theo" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" sx={{ pl: 3 }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    name="label"
                                    onChange={handleCheck}
                                />
                            }
                            label="Label"
                        />
                    </FormGroup>
                </List>
            </Collapse>
        </List>
    );
};

export default FilterTest;