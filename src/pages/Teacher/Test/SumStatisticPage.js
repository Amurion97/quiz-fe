import { Box, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import Tags from "../../../components/ResulTest/Tags";
import SumStatisticForm from "../../../components/Forms/SumStaticForm";

const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    textAlign: "center",
}));
const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: "#7a1fa2",
    textAlign: "center",
    color: "#fff",
}));

export default function TestStatisticPage() {
    return (
        <>
            <Grid container spacing={4} sx={{ mt: 9 }}>
                <SumStatisticForm />
            </Grid>
        </>
    );
}
