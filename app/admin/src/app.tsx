import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdminHomePage, AdminLoginPage } from "./page";
import { UserContext } from "./context";
import { UserDefinition } from "./api/definition";
import { darkTheme } from "./theme";

const App = () => {
    const [user, setUser] = useState<UserDefinition | null>(null);

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default App;
