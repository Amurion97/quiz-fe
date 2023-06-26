import { Outlet } from "react-router-dom";
import { Button, Grid, IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function DashboardLayout() {
    const [collapsedNavBar, setCollapsedNavBar] = useState(false);
    const gridSize = collapsedNavBar
        ? {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
          }
        : {
              xs: 10.5,
              sm: 10.5,
              md: 11,
              lg: 10,
          };
    return (
        <>
            <Grid container spacing={0}>
                {!collapsedNavBar && (
                    <Grid item xs={0.5} sm={0.5} md={1} lg={2}>
                        <NavBar />
                    </Grid>
                )}

                <Grid item {...gridSize}>
                    <IconButton
                        aria-label="menu"
                        onClick={() => {
                            setCollapsedNavBar(!collapsedNavBar);
                        }}
                        sx={{
                            position: "fixed",
                            top: "30px",
                            left: collapsedNavBar ? "30px" : "240px",
                        }}
                    >
                        {collapsedNavBar ? <MenuIcon /> : <CloseIcon />}
                    </IconButton>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}
