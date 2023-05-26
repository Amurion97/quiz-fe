import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// @mui
import {
    TextField,
    RadioGroup,
    FormControlLabel, Radio, Autocomplete, InputLabel, Select, MenuItem, FormControl, Grid,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {styled, useTheme} from "@mui/material/styles";
import axios from "axios";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import {Css} from "@mui/icons-material";

// components

const StyledContent = styled('div')(({theme}) => ({
    // maxHeight: "60%",
    // margin: 'auto',
    display: 'flex',
    // minWidth: "60%",
    maxWidth: "70vw",
    width: "100%",
    minWidth: "60%",
    flexDirection: 'column',
    // padding: theme.spacing(12, 0),
    backgroundColor: '#ffffff',
    padding: "15px 25px 25px",
    borderRadius: "4px"
}));

// ----------------------------------------------------------------------

export default function SearchForm() {
    const navigate = useNavigate();
    const theme = useTheme();
    const handleClick = () => {
        setLoading(true)
        // navigate('/dashboard', {replace: true});
    };
    const [loading, setLoading] = useState(false);
    const [airports, setAirports] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    useEffect(() => {
        console.log("form did mount");
        axios.get("http://127.0.0.1:5000/v1/airports")
            .then(res => {
                console.log("airports:", res.data.data);
                setAirports(res.data.data.map(item => {
                    return {
                        label: `${item.name}, ${item.city}, ${item.country}`,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get airport:", e))
    }, [])

    return (
        <>
            <StyledContent>

                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={6}>
                            <FormControlLabel value="two" control={<Radio/>} label="Roundtrip"/>
                        </Grid>
                        <Grid item xs={4} sm={4} md={6}>
                            <FormControlLabel value="one" control={<Radio/>} label="Oneway"/>
                        </Grid>
                    </Grid>
                </RadioGroup>

                <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 4, sm: 8, md: 12}}>

                    <Grid item xs={4} sm={4} md={6}>
                        <Autocomplete
                            disablePortal
                            id="from"
                            options={airports}
                            sx={{width: "100%"}}
                            renderInput={(params) => <TextField {...params}
                                                                label="Flying From"
                                // InputLabelProps={{
                                //     sx: {
                                //         // set the color of the label when not shrinked
                                //         color: palette.three,
                                //         [`&.${inputLabelClasses.shrink}`]: {
                                //             // set the color of the label when shrinked (usually when the TextField is focused)
                                //             color: palette.three
                                //         }
                                //     }
                                // }}
                            />}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                        <Autocomplete
                            disablePortal
                            id="to"
                            options={airports}
                            sx={{width: "100%"}}
                            renderInput={(params) => <TextField {...params} label="Flying To"/>}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                        <DatePicker label="Departure date"
                                    // slotProps={{
                                    //     // pass props `actions={['clear']}` to the actionBar slot
                                    //     TextField: { color:"secondary" },
                                    // }}
                                    // color="secondary"
                                    // sx={{
                                    //     '&:hover .MuiFormControl-root-MuiTextField-root': {
                                    //         borderRadius: '10px',
                                    //         // borderColor: theme.palette.primary.contrastText,
                                    //         borderColor: "red",
                                    //     },
                                    //     '&.Mui-focused .MuiInputBase-root-MuiOutlinedInput-root': {
                                    //         borderRadius: '10px',
                                    //         // borderColor: theme.palette.primary.contrastText,
                                    //         borderColor: "red",
                                    //     },
                                    // }}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                        <DatePicker label="Return date"/>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Travel Class</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Travel Class"
                                // onChange={handleChange}
                            >
                                {classOptions.map(item => (
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>

                        <LoadingButton fullWidth size="large" type="submit" variant="contained"
                                       onClick={handleClick}
                                       style={{
                                           height: "100%"
                                       }}
                                       loading={loading}
                                       loadingPosition="start"
                                       startIcon={<SearchIcon/>}>
                            <span>{(loading) ? "Searching…" : "Search flights"}</span>
                        </LoadingButton>
                    </Grid>
                </Grid>

            </StyledContent>

        </>
    );
}
