//React
import { useEffect } from "react";
import { useState } from "react";
import {  CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation } from "react-router-dom";
//Mui
import { useTheme } from "@mui/material/styles";
import { Grid, Paper, Typography } from "@mui/material";
///mui-icon
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
//componnent
import { customAPIv1 } from "../../features/customAPI";

import _ from "lodash";

const Separator = (props) => {
    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                transform: `rotate(${props.turns}turn)`
            }}
        >
            <div style={props.style} />
        </div>
    );
}

const RadialSeparators = (props) => {
    const turns = 1 / props.count;
    return _.range(props.count).map(index => (
        <Separator turns={index * turns} style={props.style} />
    ));
}

export default function Icons(props) {
    const theme = useTheme();

    const location = useLocation();
    console.log("location in Icon of Result-Static:", location)
    const { state } = location;
    let id;
    if (state) {
        ({ id } = state);
    }
    const [attempts, setAttempts] = useState([]);
    const updateAttempts = () => {
        customAPIv1()
            .get(`/attempts/test/${id}`)
            .then((res) => {
                console.log("attempts of test:", res.data);
                setAttempts(res.data.data);
            })
            .catch((e) => console.log("error in get attempts:", e));
    };
    useEffect(() => {
        console.log("attempts page did mount");
        updateAttempts();
    }, []);
    console.log("attemp page", attempts)



    return (
        <>
            <Grid container >
                <Grid item xs={4} sx={{}} >
                    <Paper sx={{ width: 80, height: 80, ml:"auto",mr:"auto"}}>
                        <CircularProgressbarWithChildren
                            value={props.accurac?props.accurac:0}
                            styles={buildStyles({
                                
                                backgroundColor: theme.palette.grey[300],
                                pathColor: theme.palette.success.main,
                                trailColor:props.accurac? theme.palette.error.main:""
                            })}
                            background={true}
                            strokeWidth={10}
                        >
                            <CrisisAlertIcon sx={{ width: 30, height: 30 }} />
                            <Typography >{props.accurac?props.accurac.toFixed(1):0}%</Typography>
                            <RadialSeparators
                                count={props.accurac?10:0}
                                style={{
                                    background: props.accurac?"#fff":"",
                                    width:props.accurac? "2px":'',
                                    height:props.accurac? `${10}%`:""
                                }}
                            />
                        </CircularProgressbarWithChildren>
                        <Typography sx={{textAlign:"center", lineHeight: 'normal'}}>Chính xác</Typography>

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{ width: 80, height: 80, ml:"auto",mr:"auto" }}>
                        <CircularProgressbarWithChildren
                            styles={buildStyles({
                                backgroundColor: theme.palette.grey[300],
                            })}
                            background={true}
                            strokeWidth={0}
                        >
                            <HelpOutlineOutlinedIcon sx={{ width: 30, height: 30 }} />
                            <Typography>{props.question}</Typography>
                        </CircularProgressbarWithChildren>
                        <Typography sx={{textAlign:"center"}}>Câu hỏi</Typography>

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{ width: 80, height: 80, ml:"auto",mr:"auto" }}>
                        <CircularProgressbarWithChildren
                            styles={buildStyles({
                                backgroundColor: theme.palette.grey[300],
                            })}
                            background={true}
                            strokeWidth={0}
                        >
                            <GroupsOutlinedIcon sx={{ width: 30, height: 30 }} />
                            <Typography>{props.answer}</Typography>
                        </CircularProgressbarWithChildren>
                        <Typography sx={{textAlign:"center"}}>Lượt thi</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
