import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Accordion, Avatar, Breadcrumbs, Button, Divider, Grid, Grow, Paper, Typography } from "@mui/material";
import { CustomerContext } from "../context";
import { stringAvatar } from "../util";

const ShopCustomerSettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const { customer } = useContext(CustomerContext);

    useEffect(() => {
        if (customer) {
            setLoading(false);
        }
    }, [customer]);

    if (loading) {
        return;
    }

    return (
        <React.Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/settings">
                            <Typography color="text.primary">Settings</Typography>
                        </Link>
                        <Link to="/settings">
                            <Typography color="secondary">{customer.firstName} {customer.lastName}</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={12}>
                <Grow in={true} {...{ timeout: 500 }}>
                    <Paper elevation={3} sx={{p: 2, minHeight: "10rem"}}>
                    </Paper>
                </Grow>
            </Grid>
        </React.Fragment>
    );
}

export default ShopCustomerSettingsPage;
