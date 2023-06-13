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
import YoutubeSearchedForTwoToneIcon from "@mui/icons-material/YoutubeSearchedForTwoTone";

const FilterTag = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const [checkedValues, setCheckedValues] = useState({
        Toan: true,
        Hoa: false,
        Anh: false,
        Su: false,
    });

    const handleCheck = (event) => {
        const { name, checked } = event.target;
        setCheckedValues((prevState) => ({ ...prevState, [name]: checked }));
        handleFilter();
    };

    const handleFilter = () => {
        const selectedSubjects = Object.keys(checkedValues).filter(
            (subject) => checkedValues[subject]
        );
        console.log(selectedSubjects, "day la filter bên tags");
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
                    Tìm kiếm theo môn học
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <YoutubeSearchedForTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Sắp xếp" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" sx={{ pl: 3 }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    name="Toan"
                                    onChange={handleCheck}
                                />
                            }
                            label="Toan"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Hoa" onChange={handleCheck} />}
                            label="Hoa"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Anh" onChange={handleCheck} />}
                            label="Anh"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Su" onChange={handleCheck} />}
                            label="Su"
                        />
                    </FormGroup>
                </List>
            </Collapse>
            <button onClick={handleFilter}>Lọc</button>
        </List>
    );
};

export default FilterTag;