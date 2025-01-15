import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Breadcrumbs, Typography } from "@mui/material";

const ShopCustomerOrderPage = () => {
    return (
        <React.Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/order">
                            <Typography color="text.primary">Order</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default ShopCustomerOrderPage;