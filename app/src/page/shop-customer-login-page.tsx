import React from "react";
import {Box, Breadcrumbs, Grid, Grow, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {CustomerLoginForm} from "../organism";

const ShopCustomerLoginPage = (): React.JSX.Element => {
    return (
        <Box>
            <Grid sx={{width: "60%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={12}>
                    <Paper sx={{p: 1}}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/">
                                <Typography color="text.primary">Home</Typography>
                            </Link>
                            <Link to="/login">
                                <Typography color="secondary">Login</Typography>
                            </Link>
                        </Breadcrumbs>
                    </Paper>
                </Grid>

                <Grow in={true} {...{timeout: 250}}>
                    <Grid item xs={12} xl={6} spacing={1}>
                        <Paper sx={{p: 4}} elevation={1}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <CustomerLoginForm />
                            </Box>
                        </Paper>
                    </Grid>
                </Grow>

                <Grow in={true} {...{timeout: 500}}>
                    <Grid item xs={0} xl={6} spacing={1}>
                        <Paper elevation={1}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                1
                            </Box>
                        </Paper>
                    </Grid>
                </Grow>
            </Grid>
        </Box>
    );
}

export default ShopCustomerLoginPage;