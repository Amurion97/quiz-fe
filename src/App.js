import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";
import './index.css';
import {HelmetProvider} from "react-helmet-async";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ThemeProvider from "./theme";

function App() {
    return (
        <ThemeProvider>
            <HelmetProvider>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Router/>
                    </LocalizationProvider>
                </BrowserRouter>
            </HelmetProvider>
        </ThemeProvider>
    );
}

export default App;
