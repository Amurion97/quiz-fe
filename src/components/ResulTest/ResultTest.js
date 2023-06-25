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
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { customAPIv1 } from "../../features/customAPI";
import { useState } from "react";
import { useEffect } from "react";

const columns = [
    { id: "email", label: "Email", minWidth: 100 },
    { id: "", label: "", minWidth: 150 },
    { id: "accuracy", label: "Accuracy", minWidth: 100 },
    { id: "point", label: "Point", minWidth: 100 },
    { id: "score", label: "Score", minWidth: 100 },
];

export default function ResulTest() {
    const theme = useTheme();

    const location = useLocation();
    console.log("location in Icon of Result-Static:", location);
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
    console.log("attemp page", attempts);
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
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
                        {attempts.map((item, index) => (
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
                                            spacing={3}
                                            sx={{ height: "100%" }}>
                                            {[...Array(10)].map(
                                                (item, index) => (
                                                    <Grid
                                                        xs={12 / 12}
                                                        sx={{ pl: 0.1 }}>
                                                        <Box
                                                            sx={{
                                                                bgcolor:
                                                                    index < 4
                                                                        ? "green"
                                                                        : "red",
                                                                height: "100%",
                                                                borderRadius: 0.5,
                                                            }}
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    </Box>
                                </TableCell>
                                <TableCell>H3</TableCell>
                                <TableCell>H4</TableCell>
                                <TableCell>H5</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
