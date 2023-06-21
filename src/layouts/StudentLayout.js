import * as React from 'react';
import {styled, alpha, useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import HistoryIcon from '@mui/icons-material/History';
import {Outlet} from "react-router-dom";
import Logo from "../components/logo";
import {Paper, Stack} from "@mui/material";
import {Button} from "@mui/material";
import {useState} from "react";
import {createContext} from "react";
import TopBar from "../components/TopBar";




export const NameContext = createContext(null);
export default function StudentLayout() {
    const [confirmedContentQuery, setConfirmedContentQuery] = useState("");
    const [contentQuery, setContentQuery] = useState("");
    const handleInputChange = (event) => {
        setConfirmedContentQuery(contentQuery);
    };
    const theme = useTheme()
    return (
        <>
            <TopBar handleInputChange={handleInputChange}
                    setContentQuery={setContentQuery}
                    contentQuery={contentQuery}/>
            <Box sx={{height: '64px', width: '100vw', position: 'static'}}>
            </Box>
            <NameContext.Provider value={confirmedContentQuery}>
                <Outlet></Outlet>
            </NameContext.Provider>
        </>
    );
}
