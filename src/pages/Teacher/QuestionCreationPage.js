import {Helmet} from 'react-helmet-async';
// @mui
import {Grid} from '@mui/material';
// hooks
// components
// sections
import QuestionCreationForm from "../../components/Forms/Question/QuestionCreationForm";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function QuestionCreationPage() {
    return (
        <>
            <Helmet>
                <title> Flight Creation | Flight </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    height: "100%",
                    padding: "5%"
                }}
            >
                <Grid item xs={12}>
                    <QuestionCreationForm/>
                </Grid>
            </Grid>
        </>
    )
}
