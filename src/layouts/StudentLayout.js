import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from "@mui/icons-material/History";
import { Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { createContext } from "react";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));


export const NameContext = createContext(null);
export default function StudentLayout() {
    const [confirmedContentQuery, setConfirmedContentQuery] = useState("");
    const [contentQuery, setContentQuery] = useState("");
    const handleInputChange = (event) => {
        setConfirmedContentQuery(contentQuery);
    };
    console.log("contentQuery", contentQuery)
    console.log("confirmedContentQuery", confirmedContentQuery)
    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 2 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: 999,
                    }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}></Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                                value={contentQuery}
                                onChange={(e)=> {
                                    setContentQuery(e.target.value);
                                }}
                            />
                        </Search>
                        <Button variant="contained" onClick={handleInputChange}>
                            Search
                        </Button>
                        {/* <Box sx={{flexGrow: 1}}/>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                // aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            > 
                                <AccountCircle/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                // aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
            
                                <MoreIcon/>
                            </IconButton>
                        </Box> */}
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{height: '64px', width: '100vw', position: 'static'}}>
            </Box>
            <NameContext.Provider value={confirmedContentQuery}>
                <Outlet></Outlet>
            </NameContext.Provider>
        </>
    );
}
