import { Grid, Paper, Typography, styled } from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Box from "@mui/material/Box";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useTheme } from "styled-components";
import { useLocation } from "react-router-dom";
import { customAPIv1 } from "../../features/customAPI";
import { useEffect } from "react";
import { useState } from "react";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#7a1fa2",
    textAlign: "center",
    color: "#fff",
}));
const Circle = styled(Box)(({ theme }) => ({
    width: 80,
    height: 80,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: "50%",
    position: "relative",
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        opacity: [0.9, 0.8, 0.7],
    },
}));

const customStyles = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    top: "50%",
    fontSize: "40px",
    color: "#fff",
};

export default function Icons() {
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

    const percentage = 66;

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Paper>
                        {/*<Circle>*/}
                        {/*    <CrisisAlertIcon sx={customStyles} />*/}
                        {/*</Circle>*/}
                        {/*<Typography>Accuracy</Typography>*/}
                        {/*<CircularProgressbar value={percentage} text={`${percentage}%`} />;*/}

                        <CircularProgressbarWithChildren value={66}>
                            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                            <img
                                style={{ width: 40, marginTop: -5 }}
                                src="https://i.imgur.com/b9NyUGm.png"
                                alt="doge"
                            />
                            <div style={{ fontSize: 12, marginTop: -5 }}>
                                <strong>66%</strong> mate
                            </div>
                        </CircularProgressbarWithChildren>

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Circle>
                            <HelpOutlineOutlinedIcon sx={customStyles} />
                        </Circle>
                        <Typography>Questions</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Circle>
                            <GroupsOutlinedIcon sx={customStyles} />
                        </Circle>
                        <Typography>Participant</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
