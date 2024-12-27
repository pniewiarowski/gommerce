import { Box, Slide, useTheme } from "@mui/material"
import Rive from "@rive-app/react-canvas";
import { useLocation } from "react-router-dom";

const AdminGoopher = () => {
    const theme = useTheme();
    const location = useLocation();

    return (
        <Box sx={{ zIndex: 100000, position: "absolute", right: "0px", bottom: "-75px" }}>
            <Rive
                style={{ width: 400, height: 400 }}
                src="/goopher.riv"
                stateMachines="entry"
            />
        </Box >
    );
}

export default AdminGoopher;
