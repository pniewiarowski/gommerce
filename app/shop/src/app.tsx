import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, Grid, ThemeProvider, useMediaQuery } from "@mui/material";
import { CategoryDefinition, UserDefinition, CustomerDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend, useCookies } from "gommerce-app-shared/hook";
import {
    ShopHomePage,
    ShopCustomerLoginPage,
    ShopCustomerRegisterPage,
    ShopCustomerSettingsPage,
    ShopCategoryPage,
    ShopProductPage,
    ShopCheckoutPage,
    ShopCheckoutAddressPage,
    ShopCheckoutPaymentMethodPage,
    ShopCheckoutSuccessPage,
    ShopCheckoutSummaryPage,
} from "./page";
import { Footer, MailingForm, Navbar } from "./organism";
import { CustomerContext, JwtContext, ShopBagContext, UserContext } from "./context";
import { darkTheme, lightTheme } from "./theme";
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

        const cookieBag = get("gommerce-shop-bag");
        if (cookieBag.length !== 0) {
            const shopBag: Array<ProductDefinition> = JSON.parse(cookieBag);
            setShopBag(shopBag);
        }

        setCustomer({
            id: customerID,
            firstName: customerFirstName,
            lastName: customerLastName,
            isActive: true,
            userID: customerUserID,
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
                            <ThemeProvider theme={lightTheme}>
                                <CssBaseline enableColorScheme />
                                <BrowserRouter>
                                    <Navbar
                                        heading={"gommerce"}
                                        width={desktop ? "77.5%" : "100%"}
                                        categories={categories}
                                    />
                                    <Grid sx={{ width: desktop ? "75%" : "100%", mx: "auto", mb: 1 }} container spacing={1}>
                                        <Routes>
                                            <Route path="/" element={<ShopHomePage />} />
                                            <Route path="/login" element={<ShopCustomerLoginPage />} />
                                            <Route path="/register" element={<ShopCustomerRegisterPage />} />
                                            <Route path="/settings" element={<ShopCustomerSettingsPage />} />
                                            <Route path="/category/:id" element={<ShopCategoryPage />} />
                                            <Route path="/product/:id" element={<ShopProductPage />} />
                                            <Route path="/checkout" element={<ShopCheckoutPage />} />
                                            <Route path="/checkout/address" element={<ShopCheckoutAddressPage />} />
                                            <Route path="/checkout/payment-method" element={<ShopCheckoutPaymentMethodPage />} />
                                            <Route path="/checkout/summary" element={<ShopCheckoutSummaryPage />} />
                                            <Route path="/checkout/success" element={<ShopCheckoutSuccessPage />} />
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
