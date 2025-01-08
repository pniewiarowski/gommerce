import { ThemeOptions, createTheme } from "@mui/material/styles";

const createDefaultTheme = (): ThemeOptions => {
    const extraComponents = {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    fontWeight: 900,
                    lineHeight: 1.4,
                    letterSpacing: 0,
                    padding: "",
                },
            },
        },
    };

    return createTheme({
        palette: {
            mode: "light",
            background: {
                default: `#13457677`,
            },
            primary: {
                main: "#134576",
            },
            secondary: {
                main: "#134576",
            },
        },
        typography: {
            h3: {
                fontWeight: 900,
                fontFamily: "Roboto",
                fontSize: 20,
            },
            h4: {
                fontWeight: 700,
                fontFamily: "Roboto",
                fontSize: 14,
            },
        },

        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: "#ffffff"
                    }
                }
            },
            ...extraComponents,
        },
    });
}

export default createDefaultTheme;
