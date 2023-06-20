import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";
import './index.css';
import {HelmetProvider} from "react-helmet-async";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ThemeProvider from "./theme";
import {Container} from "@mui/material";
import SimpleBar from 'simplebar-react';

function App() {
    return (
        <ThemeProvider>
            <HelmetProvider>
                <BrowserRouter>
                    {/*<Container maxWidth="sm">Content</Container>*/}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <SimpleBar style={{maxHeight: "100vh"}}>
                            <Router/>
                        </SimpleBar>
                    </LocalizationProvider>
                </BrowserRouter>
            </HelmetProvider>
        </ThemeProvider>
    );
}

export default App;
