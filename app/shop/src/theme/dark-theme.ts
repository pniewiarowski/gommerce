import { ThemeOptions, createTheme } from "@mui/material/styles";

const accent = "#651fff";

const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: accent,
        },
        secondary: {
            main: accent,
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
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    fontWeight: 900,
                    lineHeight: 1.5,
                    letterSpacing: 0,
                    padding: "0.5rem 2rem",
                },
            },
        },
    },
});

export default darkTheme;
