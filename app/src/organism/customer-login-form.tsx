import React from "react";
import {Box, TextField} from "@mui/material";

const CustomerLoginForm = (): React.JSX.Element => {
    return (
        <form style={{width: "100%", padding: "1rem"}}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                <TextField sx={{width: "100%", mb: 2}} variant="outlined" color="secondary"/>
                <TextField sx={{width: "100%", mb: 2}} variant="outlined" color="secondary"/>
            </Box>
        </form>
    );
}

export default CustomerLoginForm;
