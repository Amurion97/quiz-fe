import React, {useEffect, useState} from 'react';
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
import {customAPIv1} from "../../../features/customAPI";

const FilterTags = ({handleCheckTags, selectedTagIDs}) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const [tags, setTags] = useState([]);
    useEffect(() => {
        customAPIv1().get(`/tags`)
            .then(res => {
                if (res?.data?.data) {
                    setTags(res.data.data);
                }
            })
            .catch(e => console.log("error in get users:", e))
    }, []);

    return (
        <List
            sx={{width: '100%', bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <></>
                // <ListSubheader
                //     component="div"
                //     id="nested-list-subheader"
                //     sx={{mt: 1}}
                // >
                //     Tìm kiếm theo thẻ
                // </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <YoutubeSearchedForTwoToneIcon/>
                </ListItemIcon>
                <ListItemText primary="Tìm kiếm theo thẻ"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List component="div" sx={{pl: 3}}>
                    <FormGroup>

                        {tags.map((item) => (
                            <FormControlLabel
                                key={item.id}
                                control={<Checkbox
                                    checked={selectedTagIDs[item.id]}
                                    onChange={handleCheckTags}
                                    name={item.id.toString()}
                                />}
                                label={item.name}
                            />
                        ))}
                    </FormGroup>
                </List>
            </Collapse>
        </List>
    );
};

export default FilterTags;