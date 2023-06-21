import {Outlet} from 'react-router-dom';
import {Grid} from "@mui/material";
import NavBar from "../components/NavBar";

// ----------------------------------------------------------------------

export default function DashboardLayout() {

    return (
        <>
            <Grid container spacing={0} columns={{xs: 4, sm: 5, md: 6, lg: 7}}>
                <Grid item xs={0.5} sm={1} md={1} lg={1}>
                    <NavBar/>
                </Grid>
                <Grid item xs={3.5} sm={4} md={5} lg={6}>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}
