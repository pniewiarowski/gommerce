import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Navbar} from "./organism";
import {ShopHomePage, ShopCustomerLoginPage, ShopCustomerRegisterPage} from "./page";
import {darkTheme} from "./theme";
import "./base.css";
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
                            showShoppingBagIcon
                            showAccountIcon
                            showLoginButton
                    />
                    <Routes>
                        <Route path="/" element=<ShopHomePage/>/>
                        <Route path="/login" element=<ShopCustomerLoginPage/>/>
                        <Route path="/register" element=<ShopCustomerRegisterPage/>/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
