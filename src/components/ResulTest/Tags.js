import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { customAPIv1 } from "../../features/customAPI";
import { useEffect } from "react";

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#7a1fa2",
    textAlign: "center",
    color: "#fff",
}));

export default function Tags() {
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
            <Typography variant="h3" sx={{ textAlign: "left" }}>
                {attempts.map((item, index) => (
                    index == 0 ? item.test.name : ""
                ))}
            </Typography>
            <hr />
            <Typography variant="h7" sx={{ textAlign: "left" }}>
                {attempts.map((item, index) => (
                    index == 0 ? item.finish : ""
                ))}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
                {attempts.map((item, index) => {
                    if (index === 0) {
                        return item.test.tags.map((tag, tagIndex) => {
                            if (tagIndex === item.test.tags.length - 1) {
                                return tag.name + ".";
                            } else {
                                return tag.name + ", ";
                            }
                        }).join(" ");
                    } else {
                        return "";
                    }
                })}
            </Typography>
            {/* <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Paper elevation={0}>Tag 1</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper elevation={0}>Tag 1</Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper elevation={0}>Tag 1</Paper>
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={2}>
                    <Typography>Participant</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Question</Typography>
                </Grid>
            </Grid> */}
        </>
    );
}
