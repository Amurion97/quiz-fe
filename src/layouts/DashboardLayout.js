import {Outlet} from "react-router-dom";
import {Grid} from "@mui/material";
import NavBar from "../components/NavBar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {useState} from "react";
import Collapse from '@mui/material/Collapse';

export default function DashboardLayout() {
    const [menubar, setMenu] = useState();
    console.log(menubar);
    const [sizeMenuBar, setSizeMenuBar] = useState();
    const navProps =
        menubar ? {
            xs: 0, sm: 0, md: 0, lg: 0
        } : {
            xs: 0.5, sm: 1, md: 1, lg: 1
        }

    const contentProps =
        menubar ? {
            xs: 4, sm: 5, md: 6, lg: 7
        } : {
            xs: 3.5, sm: 4, md: 5, lg: 6
        }

    return (
        <>
            {menubar == true ? (
                <MenuRoundedIcon
                    onClick={() => setMenu(false)}
                    sx={{
                        // marginLeft: "10px",
                        position: 'fixed', color: "#0C4497", fontSize: "28px",
                        top: '50px',
                        left: '10px',
                        zIndex: 999,
                    }}
                />) : <CloseRoundedIcon
                onClick={() => setMenu(true)}
                sx={{
                    // marginLeft: "190px",
                    color: "#0C4497", fontSize: "28px",
                    position: 'fixed',
                    top: '50px',
                    left: '190px',
                    zIndex: 999,
                }}
            />}
            <Grid
                container
                spacing={0}
                columns={{xs: 4, sm: 5, md: 6, lg: 7}}>


                <Grid item {...navProps}>

                    <Collapse orientation="horizontal" in={!menubar}>
                        <NavBar/>
                    </Collapse>

                </Grid>

                <Grid item
                      // xs={12} sm={4} md={5} lg={6}
                      {...contentProps}
                      sx={{
                          pl: 3,
                          transition: (theme) => theme.transitions.create(['width', 'transform'], {
                              duration: theme.transitions.duration.standard,
                          })
                      }}
                >
                    <Outlet/>
                </Grid>
            </Grid>
            {/*<Grid*/}
            {/*    container*/}
            {/*    spacing={0}*/}
            {/*    columns={{xs: 12, sm: 5, md: 6, lg: 7}}>*/}

            {/*    <Grid item xs={12} sm={4} md={5} lg={12}>*/}

            {/*        <Outlet/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </>
    );
}
