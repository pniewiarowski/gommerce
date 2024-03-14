import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, Grid, ThemeProvider, useMediaQuery} from "@mui/material";
import {Navbar} from "./organism";
import {ShopHomePage, ShopCustomerLoginPage, ShopCustomerRegisterPage, ShopCategoryPage} from "./page";
import {CategoryDefinition} from "./api/definition";
import {darkTheme} from "./theme";
import useBackend from "./hook/use-backend.ts";
import "./base.css";

const App = (): React.JSX.Element => {
    const desktop: boolean = useMediaQuery('(min-width:1200px)');
    const [isAdminGroupRoutes, setIsAdminGroupRoutes] = useState<boolean>(false);
    const {categoriesRepository} = useBackend();
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await categoriesRepository.get());
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        setIsAdminGroupRoutes(window.location.href.includes("admin"));
    }, []);

    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline enableColorScheme/>
                <BrowserRouter>
                    {!isAdminGroupRoutes &&
                        <Navbar heading={"gommerce"}
                                elevation={3}
                                showShoppingBagIcon
                                showAccountIcon
                                showLoginButton
                                width={desktop ? "72.5%" : "100%"}
                                categories={categories}/>}

                    <Grid sx={{width: desktop ? "70%" : "100%", mx: "auto"}} container spacing={1}>
                        <Routes>
                            <Route path="/" element={<ShopHomePage/>}/>
                            <Route path="/login" element={<ShopCustomerLoginPage/>}/>
                            <Route path="/register" element={<ShopCustomerRegisterPage/>}/>
                            <Route path="/category/:id" element={<ShopCategoryPage/>}/>
                        </Routes>
                    </Grid>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
