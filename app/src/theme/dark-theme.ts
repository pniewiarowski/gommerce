import {ThemeOptions, createTheme} from "@mui/material/styles";

const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#651fff',
        },
        secondary: {
            main: '#651fff',
        },
    },
    typography: {
        h3: {
            fontWeight: 900,
            fontFamily: "sans-serif",
            fontSize: 20,
        },
        h4: {
            fontWeight: 700,
            fontFamily: "sans-serif",
            fontSize: 14,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "sans-serif",
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
