//mui
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer, Typography,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useTheme} from "@mui/material/styles";
//react
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
//components
import {customAPIv1} from "../../features/customAPI";


export default function ResulTest({setAccurac, setAnswer, setQuestion}) {
    const theme = useTheme();
    const [isMobileSize, setIsMobileSize] = useState(true);

    let columns = [
        {id: "email", label: "Email", minWidth: 100, align: 'center'},
        {id: "accuracy", label: "Chính xác", minWidth: 50, align: 'center'},
    ];

    if (isMobileSize) {
        columns = [
            ...columns,
            {id: "", label: "", minWidth: 300},
            {id: "point", label: " Điểm", minWidth: 50, align: 'center'},
            {id: "finish", label: "Thời gian", minWidth: 100, align: 'center'},
        ];
    }

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (windowWidth <= 376 && windowHeight <= 668) {
                setIsMobileSize(false);
            } else {
                setIsMobileSize(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

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

    const totalScore = attempts.reduce((sum, item) => {
        console.log("item", item);
        const score = parseInt(item.score)
        return sum + score;
    }, 0);
    setAccurac(totalScore / attempts.length);
    setAnswer(attempts.length)


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
                                    }}
                                >
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
                            let date = new Date(item.finish);
                            setQuestion(sumQuestions);
                            console.log('sumQuestions', sumQuestions);
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography
                                            variant={'body2'}
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '60vw',
                                            }}
                                        >
                                            {item.user.email}
                                        </Typography>

                                    </TableCell>

                                    <TableCell sx={{textAlign: "center"}}>{item.score}%</TableCell>
                                    {isMobileSize && (
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    height: "2vh",
                                                    width: "100%",
                                                    // mt: 3,
                                                }}
                                            >
                                                <Grid container spacing={0} sx={{height: "100%"}}>
                                                    {[...Array(sumQuestions)].map((item, index) => (
                                                        <Grid
                                                            key={item}
                                                            item
                                                            xs={12 / sumQuestions}
                                                            sx={{pl: 0.2}}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    bgcolor: (theme) =>
                                                                        index < corrects
                                                                            ? theme.palette.success.main
                                                                            : theme.palette.error.main,
                                                                    height: "100%",
                                                                    borderRadius: "2.5px",
                                                                }}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>

                                        </TableCell>
                                    )}
                                    {isMobileSize && (
                                        <TableCell sx={{textAlign: "center"}}>{corrects}/{incorrects}</TableCell>)}
                                    {isMobileSize && (<TableCell
                                        align="center">{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}</TableCell>)}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
