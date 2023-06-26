import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useTheme} from "@mui/material/styles";
import {useLocation} from "react-router-dom";
import {customAPIv1} from "../../features/customAPI";
import {useState} from "react";
import {useEffect} from "react";

const columns = [
    {id: "email", label: "Email", minWidth: 100},
    {id: "", label: "", minWidth: 150},
    {id: "accuracy", label: "Accuracy", minWidth: 150},
    {id: "point", label: "Point", minWidth: 150},
];

export default function ResulTest() {
    const theme = useTheme();

    const location = useLocation();
    console.log("location in Icon of Result-Static:", location);
    const {state} = location;
    let id;
    if (state) {
        ({id} = state);
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
    console.log("attemp page", attempts);
    return (
        <>
            <TableContainer component={Paper} sx={{maxHeight: "70vh"}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        backgroundColor:
                                        theme.palette.primary.dark,
                                        color: theme.palette.primary
                                            .contrastText,
                                    }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attempts.map((item, index) => {
                            let corrects = item.corrects;
                            let incorrects = item.incorrects;
                            let sumQuestions = corrects + incorrects;
                            console.log('sumQuestions', sumQuestions);
                            return (
                                <TableRow>
                                    <TableCell>{item.user.email}</TableCell>
                                    <TableCell>
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
                                                {[...Array(sumQuestions)].map(
                                                    (item, index) => (
                                                        <Grid
                                                            xs={12 / sumQuestions}
                                                            sx={{pl: 0.1}}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    bgcolor:
                                                                        (theme) =>
                                                                            index < corrects
                                                                                ? theme.palette.success.main
                                                                                : theme.palette.error.main,
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
                                    <TableCell>{item.score}%</TableCell>
                                    <TableCell>{corrects}/{incorrects}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
