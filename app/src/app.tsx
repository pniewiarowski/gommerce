import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {HomePage} from "./page";
import {lightTheme} from "./theme";

const App = (): React.JSX.Element => {
    return (
        <React.Fragment>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline enableColorScheme/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element=<HomePage/>/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
