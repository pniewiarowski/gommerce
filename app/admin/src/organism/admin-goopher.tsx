import { Box } from "@mui/material"

const AdminGoopher = () => {
    return (
        <Box sx={{ zIndex: 100000, position: "absolute", right: "30px", bottom: "0px" }}>
            <img src="/goopher.png" width={320} />
        </Box>
    );
}

export default AdminGoopher;
