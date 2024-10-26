import { Box, Slide } from "@mui/material"
import { useLocation } from "react-router-dom";

const AdminGoopher = () => {
    const location = useLocation();

    /**
     * TODO: Make reactive for action provided in Context like delete entity.
     */
    return (
        <Box sx={{ zIndex: 100000, position: "absolute", right: "0px", bottom: "0px" }}>
            {location.pathname === "/shop" &&
                <Slide direction="left" in={true} {...{ timeout: 1000 }}>
                    <img src="/goopher-go-shopping.png" width={320} />
                </Slide>}
            {location.pathname === "/shop/order" &&
                <Slide direction="up" in={true} {...{ timeout: 1000 }}>
                    <img src="/goopher-is-rich.png" width={320} />
                </Slide>}
            {location.pathname === "/shop/category" &&
                <Slide direction="left" in={true} {...{ timeout: 1000 }}>
                    <img src="/goopher-educated.png" width={320} />
                </Slide>}
            {location.pathname === ("/") &&
                <Slide direction="up" in={true} {...{ timeout: 1000 }}>
                    <img src="/goopher.png" width={320} />
                </Slide>}
        </Box >
    );
}

export default AdminGoopher;
