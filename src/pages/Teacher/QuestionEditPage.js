import {Helmet} from 'react-helmet-async';
// @mui
import {Grid} from '@mui/material';
// hooks
// components
// sections
import QuestionCreationForm from "../../components/Forms/Question/QuestionCreationForm";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Page404 from "../Page404";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function QuestionEditPage() {
    const location = useLocation();
    console.log("location in edit:", location)
    const {state: {question: question}} = location;
    console.log("question in edit:", question)
    return (
        <>
            <Helmet>
                <title> Question Editing | Flight </title>
            </Helmet>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    height: "100%",
                    padding: "2% 5%"
                }}
            >
                <Grid item xs={12}>
                    {question ? <QuestionEditPage question={question}/> : <Page404/>}

                </Grid>
            </Grid>
        </>
    )
}
