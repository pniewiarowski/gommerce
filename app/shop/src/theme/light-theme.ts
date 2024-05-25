import {ThemeOptions, createTheme} from "@mui/material/styles";

const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: "light",
        background: {
            default: '#651fff',
        },
        primary: {
            main: '#651fff',
        },
        secondary: {
            main: '#ff1fff',
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
                    backgroundColor: "#eeeeee"
                }
            }
        },
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
