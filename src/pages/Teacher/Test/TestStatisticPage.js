import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useTheme} from "@mui/material/styles";
import {customAPIv1} from "../../../features/customAPI";
import {socket} from "../../../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/user/userSlice";
import {useLocation} from "react-router-dom";

const columns = [
    {id: "rank", label: "Rank", minWidth: 50, align: "center"},
    {id: "email", label: "Email", minWidth: 150},
    {id: "", label: "", minWidth: 400, align: "center"},
    {id: "score", label: "Score", minWidth: 100, align: "center"},
];

export default function TestStatisticPage() {
    const theme = useTheme();
    const user = useSelector(selectUser)

    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search);
    const roomCode = searchParams.get("code");
    const testId = searchParams.get("test");
    console.log("roomCode:", roomCode);

    const location = useLocation()
    const {state} = location

    const [peopleList, setPeopleList] = useState(state.peopleList)
    console.log("peopleList:", peopleList);

    const [totalQuestion, setTotalQuestion] = useState(0);
    useEffect(() => {
        socket.connect();

        customAPIv1()
            .get(`/tests/brief/${testId}`)
            .then((res) => {
                console.log('get test detail:', res.data)
                setTotalQuestion(res.data.data.details.length);
            });

        function onConnect() {
            socket.emit('join-room',
                {roomCode: roomCode, email: user.info.email},
                (res) => {
                    console.log('join-room', res);
                    // if (res.success !== false) {
                    //     res.sort((a, b) => (b.corrects == a.corrects) ?
                    //         (b.corrects + b.incorrects - a.corrects - a.incorrects)
                    //         : (b.corrects - a.corrects));
                    //     setPeopleList(res);
                    // }
                })
        }

        socket.on('connect', onConnect);


        return () => {
            socket.off('connect', onConnect);
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        function onRoomUpdate(arg) {
            console.log('room-update:', arg);
            console.log(arg.email,)
            console.log("peopleList:", peopleList)
            let personIndex = peopleList.findIndex((item, index) => {
                console.log("index:", index, item.email)
                return item.email == arg.email
            });
            console.log('personIndex:', personIndex)
            peopleList[personIndex].corrects = arg.corrects;
            peopleList[personIndex].incorrects = arg.incorrects;
            peopleList.sort((a, b) => (b.corrects == a.corrects) ?
                (b.corrects + b.incorrects - a.corrects - a.incorrects)
                : (b.corrects - a.corrects));
            setPeopleList([...peopleList]);

        }

        socket.on('room-update', onRoomUpdate);

        return () => {
            socket.off('room-update', onRoomUpdate);
        }
    }, [peopleList])

    return (
        <>
            <Helmet>
                <title> Group Test Statistic | Quiz </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    height: "100vh",
                    padding: "5% 10%",
                    overFlow: "scroll",
                    backgroundImage:
                        'url("/assets/images/background-test-statistics.png")',
                    backgroundSize: "cover",
                }}>

                <Grid
                    item
                    xs={12}
                    sx={{
                        textAlign: "center",
                        color: theme.palette.primary.contrastText,
                        background: "rgba(64, 64, 64, 0.85)",
                        borderRadius: "5px",
                    }}>
                    <Typography variant="titleInTheBackground">
                        Group Test statistics
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Paper padding={2} sx={{bgcolor: "transparent"}}>
                        <TableContainer
                            component={Paper}
                            sx={{maxHeight: "70vh", bgcolor: "transparent"}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    background:
                                                        "rgba(64, 64, 64, 0.85)",
                                                    color: theme.palette.primary
                                                        .contrastText,
                                                }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {peopleList.map((row, index) => {
                                        const {id, email, corrects, incorrects} = row;
                                        let sumQuestions = corrects + incorrects;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                style={{
                                                    backgroundColor:
                                                        "rgba(89,89,89, 0.85)",
                                                }}>
                                                <TableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
                                                    }}>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                    style={{
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
                                                    }}>
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={2}
                                                        pl={2}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            noWrap>
                                                            {email}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none">

                                                    <Box
                                                        sx={{
                                                            height: "2vh",
                                                            width: "100%",
                                                            mt: 3,
                                                        }}>
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                            sx={{height: "100%"}}>
                                                            {[...Array(totalQuestion)].map(
                                                                (item, index) => (

                                                                    <Grid
                                                                        xs={12 / totalQuestion}
                                                                        sx={{pl: 0.2}}
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                bgcolor: (theme) =>
                                                                                    index < sumQuestions ?
                                                                                        (index < corrects
                                                                                            ? theme.palette.success.main
                                                                                            : theme.palette.error.main)
                                                                                        :
                                                                                        theme.palette.grey[500],
                                                                                height: "100%",
                                                                                // borderRadius: 0.5,
                                                                                borderRadius: '2.5px',
                                                                            }}
                                                                        />
                                                                    </Grid>

                                                                )
                                                            )}
                                                        </Grid>
                                                    </Box>

                                                </TableCell>

                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        color: theme.palette
                                                            .primary
                                                            .contrastText,
                                                    }}>
                                                    {corrects}/{sumQuestions}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
