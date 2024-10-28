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
    },
});

export default lightTheme;
