import {ThemeOptions, createTheme} from "@mui/material/styles";

const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: '#ff5722',
        },
        secondary: {
            main: '#651fff',
        },
    },
    typography: {
        h3: {
            fontWeight: 900,
            fontFamily: "monospace",
            fontSize: 20,
        },
    },
    spacing: 10,
});

export default lightTheme;
