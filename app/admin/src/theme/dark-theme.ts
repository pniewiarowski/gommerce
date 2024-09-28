import { ThemeOptions, createTheme } from "@mui/material/styles";

const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#651fff',
        },
        secondary: {
            main: '#00D8FF',
        },
    },
    typography: {
        h3: {
            fontWeight: 900,
            fontFamily: "Roboto",
            fontSize: 18,
        },
        h4: {
            fontWeight: 700,
            fontFamily: "Roboto",
            fontSize: 14,
        },
        body1: {
            fontSize: 14,
        }
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
