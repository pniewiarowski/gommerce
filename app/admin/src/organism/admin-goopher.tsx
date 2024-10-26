import { Box, Slide, useTheme } from "@mui/material"
import { useLocation } from "react-router-dom";

const AdminGoopher = () => {
    const theme = useTheme();
    const location = useLocation();

    /**
     * TODO: Make reactive for action provided in Context like delete entity.
     */
    return (
        <Box sx={{ zIndex: 100000, position: "absolute", right: "0px", bottom: "0px" }}>
            {location.pathname === "/shop" &&
                <Slide direction="left" in={true} {...{ timeout: 1000 }}>
                    <img src={theme.palette.mode === "dark" ? "/goopher-go-shopping-dark.png" : "/goopher-go-shopping-light.png"} width={320} />
                </Slide>}
            {location.pathname === "/shop/order" &&
                <Slide direction="up" in={true} {...{ timeout: 1000 }}>
                    <img src={theme.palette.mode === "dark" ? "/goopher-is-rich-dark.png" : "/goopher-is-rich-light.png"} width={320} />
                </Slide>}
            {location.pathname === "/shop/category" &&
                <Slide direction="left" in={true} {...{ timeout: 1000 }}>
                    <img src={theme.palette.mode === "dark" ? "/goopher-educated-dark.png" : "/goopher-educated-light.png"} width={320} />
                </Slide>}
            {location.pathname === ("/") &&
                <Slide direction="up" in={true} {...{ timeout: 1000 }}>
                    <img src={theme.palette.mode === "dark" ? "/goopher-dark.png" : "/goopher-light.png"} width={320} />
                </Slide>}
        </Box >
    );
}

export default AdminGoopher;
