import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Navbar} from "./organism";
import {ShopHomePage, ShopCustomerLoginPage, ShopCustomerRegisterPage, ShopCategoryPage} from "./page";
import {CategoryDefinition} from "./api/definition";
import {darkTheme,} from "./theme";
import useBackend from "./hook/use-backend.ts";
import "./base.css";

const App = (): React.JSX.Element => {
    const {categoriesRepository} = useBackend();
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const title: string = "gommerce";
    const elevation: number = 6;

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await categoriesRepository.get());
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
