import {Box, Grid, Paper} from "@mui/material";
import React from "react";

const ShopCustomerRegisterPage = (): React.JSX.Element => {
    return (
        <Box>
            <Grid sx={{width: "60%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={12} xl={6} spacing={1}>
                    <Paper sx={{minHeight: "400px", p: 1}} elevation={1}>
                        1
                    </Paper>
                </Grid>
                <Grid sx={{mt: 1}} item xs={0} xl={6} spacing={1}>
                    <Paper sx={{minHeight: "100vh", p: 1}} elevation={1}>
                        2
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShopCustomerRegisterPage;