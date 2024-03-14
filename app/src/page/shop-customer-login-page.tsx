import React from "react";
import {Box, Breadcrumbs, Grid, Grow, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {CustomerLoginForm} from "../organism";

const ShopCustomerLoginPage = (): React.JSX.Element => {
    return (
        <Box>
            <Grid sx={{width: "70%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={12}>
                    <Paper sx={{p: 1}}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/">
                                <Typography color="text.primary">Home</Typography>
                            </Link>
                            <Link to="/account">
                                <Typography color="text.primary">Account</Typography>
                            </Link>
                            <Link to="/login">
                                <Typography color="secondary">Login</Typography>
                            </Link>
                        </Breadcrumbs>
                    </Paper>
                </Grid>
                <Grid item xs={12} xl={6} spacing={1}>
                    <Grow in={true} {...{timeout: 250}}>
                        <Paper elevation={6}>
                            <CustomerLoginForm/>
                        </Paper>
                    </Grow>
                </Grid>

                <Grid item xs={0} xl={6} spacing={1}>
                    <Grow in={true} {...{timeout: 500}}>
                        <Paper elevation={1} sx={{minHeight: "490px"}}/>
                    </Grow>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShopCustomerLoginPage;