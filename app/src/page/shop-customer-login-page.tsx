import {Box, Breadcrumbs, Grid, Paper, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const ShopCustomerLoginPage = (): React.JSX.Element => {
    return (
        <Box>
            <Grid sx={{width: "60%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={12} >
                    <Paper sx={{p: 1}}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/">
                                <Typography color="text.primary">Home</Typography>
                            </Link>
                            <Link to="/login">
                                <Typography color="text.primary">Login</Typography>
                            </Link>
                        </Breadcrumbs>
                    </Paper>
                </Grid>
                <Grid item xs={12} xl={6} spacing={1}>
                    <Paper sx={{p: 4}} elevation={1}>
                        1
                    </Paper>
                </Grid>
                <Grid item xs={0} xl={6} spacing={1}>
                    <Paper sx={{p: 4}} elevation={1}>
                        2
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShopCustomerLoginPage;