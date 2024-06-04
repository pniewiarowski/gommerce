import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import { Footer, MailingForm, Navbar } from "./organism";
import { ShopHomePage, ShopCustomerLoginPage, ShopCustomerRegisterPage, ShopCustomerSettingsPage, ShopCategoryPage, ShopProductPage } from "./page";
import { CategoryDefinition, UserDefinition, CustomerDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { darkTheme } from "./theme";
import { CustomerContext, JwtContext, ShopBagContext, UserContext } from "./context";
import useCookies from "../../_shared/hook/use-cookies.ts";
import "./base.css";


const App = () => {
    const desktop: boolean = useMediaQuery('(min-width:1200px)');
    const { get } = useCookies();
    const { categoriesRepository } = useBackend();

    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const [shopBag, setShopBag] = useState<Array<ProductDefinition>>([]);
    const [customer, setCustomer] = useState<CustomerDefinition | null>(null);
    const [user, setUser] = useState<UserDefinition | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await categoriesRepository.get());
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        if (!get("userID")) {
            return;
        }

        const customerID: number = get("customerID");
        const customerFirstName: string = get("customerFirstName");
        const customerLastName: string = get("customerLastName");
        const customerUserID: number = get("customerUserID");
        const userID: number = get("userID");
        const userEmail: string = get("userEmail");
        const jwt: string = get("jwt");

        setCustomer({
            id: customerID,
            firstName: customerFirstName,
            lastName: customerLastName,
            isActive: true,
            userId: customerUserID,
        });

        setUser({
            id: userID,
            email: userEmail,
            password: ""
        });

        setJwt(jwt);
    }, []);

    return (
        <React.Fragment>
            <JwtContext.Provider value={{ jwt, setJwt }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <CustomerContext.Provider value={{ customer, setCustomer }}>
                        <ShopBagContext.Provider value={{ shopBag, setShopBag }}>
                            <ThemeProvider theme={darkTheme}>
                                <CssBaseline enableColorScheme />
                                <BrowserRouter>
                                    <Navbar heading={"gommerce"} showLoginButton={!jwt} width="77.5%" categories={categories} />
                                    <Grid sx={{ width: desktop ? "75%" : "100%", mx: "auto", mb: 1 }} container spacing={1}>
                                        <Routes>
                                            <Route path="/" element={<ShopHomePage />} />
                                            <Route path="/login" element={<ShopCustomerLoginPage />} />
                                            <Route path="/register" element={<ShopCustomerRegisterPage />} />
                                            <Route path="/settings" element={<ShopCustomerSettingsPage />} />
                                            <Route path="/category/:id" element={<ShopCategoryPage />} />
                                            <Route path="/product/:id" element={<ShopProductPage />} />
                                        </Routes>
                                        <MailingForm />
                                        <Footer />
                                    </Grid>
                                </BrowserRouter>
                            </ThemeProvider>
                        </ShopBagContext.Provider>
                    </CustomerContext.Provider>
                </UserContext.Provider>
            </JwtContext.Provider>
        </React.Fragment>
    );
}

export default App;
