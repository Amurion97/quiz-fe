import {Helmet} from 'react-helmet-async';
// @mui
import {Grid} from '@mui/material';

import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Page404 from "../Page404";
import QuestionEditForm from "../../components/Forms/Question/QuestionEditForm";
import {customAPIv1} from "../../features/customAPI";
import SearchIcon from "@mui/icons-material/Search";
import {LoadingButton} from "@mui/lab";

export default function QuestionEditPage() {
    const location = useLocation();
    const [tags, setTags] = useState(null);
    console.log("location in edit:", location)
    const {state} = location;
    let question;
    if (state) {
        ({question} = state)
    }
    console.log("question in edit:", question);
    useEffect(() => {
        customAPIv1().get("/tags")
            .then(res => {
                console.log("tags:", res.data.data);
                setTags(res.data.data.map(item => {
                    return {
                        name: item.name,
                        id: item.id
                    }
                }))
            })
            .catch(e => console.log("error in get tags:", e))
    }, [])
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
                    {!question ? <Page404/> : (tags ? <QuestionEditForm question={question} tags={tags}/>
                        : <LoadingButton
                            fullWidth size="large" type="submit" variant="contained"
                            loading={true}
                            loadingPosition="start"
                            startIcon={<SearchIcon/>}>
                            <span>Loading…</span>
                        </LoadingButton>)}

                </Grid>
            </Grid>
        </>
    )
}
