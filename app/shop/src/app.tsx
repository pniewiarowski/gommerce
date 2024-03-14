import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, Grid, ThemeProvider, useMediaQuery} from "@mui/material";
import {Footer, MailingForm, Navbar} from "./organism";
import {ShopHomePage, ShopCustomerLoginPage, ShopCustomerRegisterPage, ShopCategoryPage} from "./page";
import {CategoryDefinition} from "./api/definition";
import {darkTheme} from "./theme";
import useBackend from "./hook/use-backend.ts";
import "./base.css";

const App = (): React.JSX.Element => {
    const desktop: boolean = useMediaQuery('(min-width:1200px)');
    const {categoriesRepository} = useBackend();
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);

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
                    <Navbar heading={"gommerce"}
                            elevation={3}
                            showShoppingBagIcon
                            showAccountIcon
                            showLoginButton
                            width={desktop ? "77.5%" : "100%"}
                            categories={categories}/>
                    <Grid sx={{width: desktop ? "75%" : "100%", mx: "auto", mb: 1}} container spacing={1}>
                        <Routes>
                            <Route path="/" element={<ShopHomePage/>}/>
                            <Route path="/login" element={<ShopCustomerLoginPage/>}/>
                            <Route path="/register" element={<ShopCustomerRegisterPage/>}/>
                            <Route path="/category/:id" element={<ShopCategoryPage/>}/>
                        </Routes>
                        <MailingForm/>
                        <Footer/>
                    </Grid>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
