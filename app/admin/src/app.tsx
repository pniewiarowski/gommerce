import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { CustomerDefinition, UserDefinition } from "gommerce-app-shared/api/definition";
import {
    AdminAccountPage,
    AdminCMSPage,
    AdminCMSThemePage,
    AdminHomePage,
    AdminLoginPage,
    AdminMailingPage,
    AdminPaymentPage,
    AdminSettingsPage,
    AdminShopCategoryCreatePage,
    AdminShopCategoryEditPage,
    AdminShopCategoryPage,
    AdminShopCustomerCreatePage,
    AdminShopCustomerEditPage,
    AdminShopCustomerPage,
    AdminShopOrderPage,
    AdminShopPage,
    AdminShopProductCreatePage,
    AdminShopProductEditPage,
    AdminShopProductPage,
} from "./page";
import { useCookies } from "gommerce-app-shared/hook";
import { JwtContext, UserContext } from "./context";
import { darkTheme } from "./theme";
import { AdminGoopher, AdminSidebar } from "./organism";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserDefinition | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);
    const { get } = useCookies();
    useEffect(() => {
        if (!get("userID")) {
            setLoading(false);

            return;
        }

        const userID: number = get("userID");
        const userEmail: string = get("userEmail");
        const jwt: string = get("jwt");

        setUser({ id: userID, email: userEmail, password: "" });
        setJwt(jwt);
        setLoading(false);
    }, []);

    if (loading) {
        return <Fragment></Fragment>;
    }

    return (
        <Fragment>
            <JwtContext.Provider value={{ jwt, setJwt }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline enableColorScheme />

                        <BrowserRouter>
                            <Grid container>
                                <Fragment>
                                    {user && jwt && <AdminSidebar />}
                                    {user && jwt && <AdminGoopher />}
                                    <Routes>
                                        <Route path="/" element={<AdminHomePage />} />
                                        <Route path="/login" element={<AdminLoginPage />} />
                                        <Route path="/shop" element={<AdminShopPage />} />
                                        <Route path="/shop/category" element={<AdminShopCategoryPage />} />
                                        <Route path="/shop/category/create" element={<AdminShopCategoryCreatePage />} />
                                        <Route path="/shop/category/edit/:id" element={<AdminShopCategoryEditPage />} />
                                        <Route path="/shop/product" element={<AdminShopProductPage />} />
                                        <Route path="/shop/product/create" element={<AdminShopProductCreatePage />} />
                                        <Route path="/shop/product/edit/:id" element={<AdminShopProductEditPage />} />
                                        <Route path="/shop/customer" element={<AdminShopCustomerPage />} />
                                        <Route path="/shop/customer/create" element={<AdminShopCustomerCreatePage />} />
                                        <Route path="/shop/customer/edit/:id" element={<AdminShopCustomerEditPage />} />
                                        <Route path="/cms" element={<AdminCMSPage />} />
                                        <Route path="/cms/theme" element={<AdminCMSThemePage />} />
                                        <Route path="/shop/order" element={<AdminShopOrderPage />} />
                                        <Route path="/mailing" element={<AdminMailingPage />} />
                                        <Route path="/account" element={<AdminAccountPage />} />
                                        <Route path="/payment" element={<AdminPaymentPage />} />
                                        <Route path="/settings" element={<AdminSettingsPage />} />
                                    </Routes>
                                </Fragment>
                            </Grid>
                        </BrowserRouter>
                    </ThemeProvider>
                </UserContext.Provider>
            </JwtContext.Provider>
        </Fragment >
    );
}

export default App;
