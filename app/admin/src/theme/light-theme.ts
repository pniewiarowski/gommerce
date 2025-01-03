import { ThemeOptions, createTheme } from "@mui/material/styles";

const primary = '#651fff';
const secondary = '#651fff';

const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: "light",
        background: {
            default: `${primary}77`,
        },
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
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

export default lightTheme;
