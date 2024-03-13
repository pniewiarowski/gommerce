import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Navbar} from "./organism";
import {ShopHomePage, ShopCustomerLoginPage, ShopCustomerRegisterPage, ShopCategoryPage} from "./page";
import {CategoryDefinition} from "./api/definition";
import {darkTheme, lightTheme} from "./theme";
import "./base.css";
import {Categories} from "./api/repository";

const App = (): React.JSX.Element => {
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const title: string = "gommerce";
    const elevation: number = 3;

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await Categories.get());
        }

        fetchCategories();
    }, []);

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
                            categories={categories}/>
                    <Routes>
                        <Route path="/" element=<ShopHomePage/>/>
                        <Route path="/login" element=<ShopCustomerLoginPage/>/>
                        <Route path="/register" element=<ShopCustomerRegisterPage/>/>
                        <Route path="/category/:id" element=<ShopCategoryPage/>/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
