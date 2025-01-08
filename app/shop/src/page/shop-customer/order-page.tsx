import React from "react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { CustomerContext, UserContext } from "../../context";

const ShopCustomerOrderPage = () => {
    const navigate = useNavigate();
    const { customer } = useContext(CustomerContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);


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
            <Grid item xs={12}>
                <Paper sx={{ p: 1 }}>
                    Orders
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default ShopCustomerOrderPage;
