import { Outlet } from "react-router-dom";
import {Grid } from "@mui/material";
import NavBar from "../components/NavBar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
export default function DashboardLayout() {
    const [menubar, setMenu] = useState();
    console.log(menubar);
    const [sizeMenuBar, setSizeMenuBar] = useState();
    return (
        <>
            {menubar == true ? (
                <Grid
                    container
                    spacing={0}
                    columns={{ xs: 12, sm: 5, md: 6, lg: 7 }}>
                    <Grid item xs={12} sm={4} md={5} lg={12}>
                        <MenuRoundedIcon
                            onClick={() => setMenu(false)}
                            sx={{ marginLeft: "10px",
                        position: 'fixed' , color: 'white' }}
                        />
                        <Outlet />
                    </Grid>
                </Grid>
            ) : (
                <Grid
                    container
                    spacing={0}
                    columns={{ xs: 4, sm: 5, md: 6, lg: 7 }}>
                    <Grid item xs={0.5} sm={1} md={1} lg={1}>
                        <CloseRoundedIcon
                            onClick={() => setMenu(true)}
                            sx={{
                                marginLeft: "190px",
                            }}
                        />
                        <NavBar />
                    </Grid>
                    <Grid item xs={12} sm={4} md={5} lg={6}>
                        <Outlet />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
