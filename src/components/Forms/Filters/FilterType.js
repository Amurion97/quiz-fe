import React, {useEffect, useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import YoutubeSearchedForTwoToneIcon from '@mui/icons-material/YoutubeSearchedForTwoTone';
import {customAPIv1} from "../../../features/customAPI";
import {ListItemText} from "@mui/material";
const FilterTypes = ({handleCheckTypes, selectedTypesIDs}) => {
    const [checkedValues, setCheckedValues] = useState({});
    const [questionTypes, setQuestionTypes] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        customAPIv1().get(`/types`)
            .then(res => {
                if (res?.data?.data) {
                    setQuestionTypes(res.data.data);
                    const initialCheckedValues = {};
                    res.data.data.map((item) => (
                        initialCheckedValues[item.id] = false
                    ));
                    setCheckedValues(initialCheckedValues);
                }
            })
            .catch(e => console.log("error in get users:", e))
    }, []);
    return (
        <List
            sx={{width: '100%', bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader
            //         component="div"
            //         id="nested-list-subheader"
            //         sx={{mt: 1}}
            //     >
            //         Lọc theo loại câu hỏi
            //     </ListSubheader>
            // }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <YoutubeSearchedForTwoToneIcon/>
                </ListItemIcon>
                <ListItemText primary="Lọc theo loại câu hỏi"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List component="div" sx={{pl: 3}}>
                    <FormGroup>
                        {questionTypes.map((item) => (
                            <FormControlLabel
                                key={item.id}
                                control={<Checkbox
                                    checked={selectedTypesIDs[item.id]}
                                    onChange={handleCheckTypes}
                                    name={item.id.toString()}
                                />}
                                label={item.name}
                            />
                        ))}
                    </FormGroup>
                </List>
            </Collapse>
        </List>
    )
}
export default FilterTypes;