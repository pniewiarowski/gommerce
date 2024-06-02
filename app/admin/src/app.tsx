import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { UserDefinition } from "gommerce-app-shared/api/definition";
import {
    AdminAccountPage,
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
    AdminShopPage,
    AdminShopProductCreatePage,
    AdminShopProductEditPage,
    AdminShopProductPage,
} from "./page";
import { useCookies } from "gommerce-app-shared/hook";
import { JwtContext, UserContext } from "./context";
import { darkTheme } from "./theme";
import { AdminSidebar } from "./organism";
import { LogoutButton } from "./molecules";

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
                                        <Route path="/mailing" element={<AdminMailingPage />} />
                                        <Route path="/account" element={<AdminAccountPage />} />
                                        <Route path="/payment" element={<AdminPaymentPage />} />
                                        <Route path="/settings" element={<AdminSettingsPage />} />
                                    </Routes>
                                    {user && jwt && <LogoutButton />}
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
