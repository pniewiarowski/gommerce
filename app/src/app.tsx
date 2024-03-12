import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {Navbar} from "./organism";
import {ShopHomePage} from "./page";
import {lightTheme, darkTheme} from "./theme";
import BackgoundImage from "./image/bg-radial-gradient-center.png";

const App = (): React.JSX.Element => {
    const title: string = "gommerce";
    const elevation: number = 3;

    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline enableColorScheme/>
                <BrowserRouter>
                    <Navbar heading={title}
                            elevation={elevation}
                            uiColor="secondary"
                            showShoppingBagIcon
                            showAccountIcon
                            showLoginButton
                    />
                    <Routes>
                        <Route path="/" element=<ShopHomePage/>/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
