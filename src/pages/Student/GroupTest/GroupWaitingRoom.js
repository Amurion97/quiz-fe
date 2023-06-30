import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    useMediaQuery,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import { useTheme } from "@mui/material/styles";
// MUI----------------------------------------------------------------

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// React----------------------------------------------------------------

import StudentsLounge from "./StudentsLounge";

//Page  ----------------------------------------------------------------

import { socket } from "../../../app/socket";
// Socket----------------------------------------------------------------

// Feature----------------------------------------------------------------
import { selectUser } from "../../../features/user/userSlice";

export default function GroupWaitingRoom() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMd = useMediaQuery(theme.breakpoints.up("md"));

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const roomCode = searchParams.get("code");
    console.log("roomCode:", roomCode);

    const user = useSelector(selectUser);
    const location = useLocation();
    console.log("location in student lobby:", location);
    const { state } = location;

    const [peopleList, setPeopleList] = useState(state ? state.peopleList : []);
    console.log("peopleList:", peopleList);

    useEffect(() => {
        socket.connect();
        console.log("this effect is running");

        function onConnect() {
            socket.emit(
                "join-lobby",
                { roomCode: roomCode, email: user.info.email },
                (res) => {
                    console.log("join-lobby", res);
                    if (res.success !== false) {
                        setPeopleList(res);
                    }
                }
            );
        }

        function onLobbyUpdate(arg) {
            console.log("lobby-update:", arg);
            if (arg.join) {
                setPeopleList((list) => [...list, arg.person]);
            } else if (arg.leave) {
                setPeopleList((list) =>
                    list.filter((item) => item.email !== arg.email)
                );
            }
        }

        function onStartTest(arg) {
            console.log("start-test:", arg);
            navigate("/groupTestTaking", {
                state: {
                    test: arg.test,
                    roomCode: roomCode,
                },
            });
        }
        socket.on("connect", onConnect);
        socket.on("lobby-update", onLobbyUpdate);
        socket.on("start-test", onStartTest);

        return () => {
            socket.off("connect", onConnect);
            socket.off("lobby-update", onLobbyUpdate);
            socket.off("start-test", onStartTest);
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <Box
                sx={{
                    p: 3,
                    margin: "auto",
                    borderWidth: "0px",
                    [theme.breakpoints.up("md")]: {
                        maxWidth: "1200px",
                        p: 10,
                    },
                    maxWidth: "100%", // Thêm thuộc tính maxWidth để không bị quá to trên màn hình nhỏ
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} sx={{ pr: isMd ? 3 : 0 }}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        src="/assets/images/avatars/avatar_default.jpg"
                                        alt="photoURL"
                                        sx={{ height: "80px", width: "80px" }}
                                    />
                                }
                                title={user.info.email}
                                subheader="You"
                                titleTypographyProps={{
                                    variant: "h4",
                                }}
                                subheaderTypographyProps={{
                                    variant: "h5",
                                }}
                                sx={{
                                    p: 5,
                                }}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: "100%", textAlign: "center" }}>
                            <CardContent sx={{ pt: 5 }}>
                                <Typography
                                    variant="h4"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    JOIN CODE
                                </Typography>
                                <Typography variant="h3" component="div">
                                    {roomCode}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: isMd ? 0 : 3,
                        }}
                    >
                        <Typography variant="h4">
                            Waiting for the host to start....
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}  sx={{
                        mt:1
                    }}>
                        <Card
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            
                                
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    py: 1,
                                    
                                }}
                            >
                                <GroupsTwoToneIcon fontSize="large" />
                                
                                    <Typography variant="h4" sx={{ ml: "4px" }}>
                                        {peopleList.length}
                                    </Typography>
                                
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <StudentsLounge
                peopleList={peopleList.filter(
                    (item) => item.email !== user.info.email
                )}
            />
        </>
    );
}
