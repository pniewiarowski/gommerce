import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UserDefinition } from "gommerce-app-shared/api/definition";
import { AdminHomePage, AdminLoginPage } from "./page";
import { JwtContext, UserContext } from "./context";
import { darkTheme } from "./theme";

const App = () => {
    const [user, setUser] = useState<UserDefinition | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);

    return (
        <React.Fragment>
            <JwtContext.Provider value={{ jwt, setJwt }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline enableColorScheme />
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<AdminHomePage />} />
                                <Route path="/login" element={<AdminLoginPage />} />
                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </UserContext.Provider>
            </JwtContext.Provider>
        </React.Fragment>
    );
}

export default App;
