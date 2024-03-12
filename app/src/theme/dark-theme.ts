import {ThemeOptions, createTheme} from "@mui/material/styles";

const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
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
            fontFamily: "sans-serif",
            fontSize: 20,
        },
    },
});

export default darkTheme;
