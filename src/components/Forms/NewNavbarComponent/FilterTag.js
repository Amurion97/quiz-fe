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

const FilterTag = ({handleCheck}) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const [tags, setTags] = useState([]);


    const [checkedValues, setCheckedValues] = useState({
        Toan: false,
        Hoa: false,
        Anh: false,
        Su: false,
    });

    // const handleFilter = () => {
    //     const selectedSubjects = Object.keys(checkedValues).filter(
    //         (subject) => checkedValues[subject]
    //     );
    //     console.log(selectedSubjects, "day la filter bên tags");
    // };

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
                                    name="Toan"
                                    onChange={handleCheck}
                                />
                            }
                            label="Toan"
                        />
                        <FormControlLabel
                            control={<Checkbox name={1} onChange={handleCheck} />}
                            label="Hoa"
                        />
                        <FormControlLabel
                            control={<Checkbox name={2} onChange={handleCheck} />}
                            label="Anh"
                        />
                        <FormControlLabel
                            control={<Checkbox name={3} onChange={handleCheck} />}
                            label="Su"
                        />
                    </FormGroup>
                </List>
            </Collapse>
        </List>
    );
};

export default FilterTag;