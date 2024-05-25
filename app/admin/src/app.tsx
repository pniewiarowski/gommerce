import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import { AdminLoginPage } from "./page";

const App = () => {
    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline enableColorScheme />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" />
                        <Route path="/login" element={<AdminLoginPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
