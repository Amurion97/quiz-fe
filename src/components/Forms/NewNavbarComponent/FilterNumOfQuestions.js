import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const number = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function FilterNumOfQuestions() {
    const [numberOfQuestion, setNumberOfQuestion] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setNumberOfQuestion(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-select-label">Loại câu hỏi</InputLabel>
                <Select
                    value={numberOfQuestion}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}

                >
                    {number.map((number) => (
                        <MenuItem key={number} value={number}>
                            <Radio checked={numberOfQuestion.indexOf(number) > -1} />
                            <ListItemText primary={number} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}