import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Avatar, Breadcrumbs, Divider, Grid, Grow, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { DeliveryDining, Person, Payment, Settings } from "@mui/icons-material";
import { CustomerContext } from "../context";
import { stringAvatar } from "../util";

class SettingsItem {
    public constructor(
        public readonly ID: number,
        public readonly label: string,
        public readonly action: () => void,
        public readonly icon: JSX.Element | null = null,
    ) {
    }
}

const ShopCustomerSettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const { customer } = useContext(CustomerContext);

    const itemsJSX = [
        new SettingsItem(1, 'General', () => { }, <Settings />),
        new SettingsItem(2, 'Account', () => { }, <Person />),
        new SettingsItem(3, 'Address', () => { }, <DeliveryDining />),
        new SettingsItem(4, 'Payment', () => { }, <Payment />),
    ].map((item) => {
        return (
            <Fragment>
                <ListItemButton
                    key={item.ID}
                    sx={{ p: 1 }}
                    onClick={() => item.action()}
                >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {item.label}
                    </ListItemText>
                </ListItemButton>
                <Divider />
            </Fragment>
        )
    });


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
            <Grid item xs={3}>
                <Grow in={true} {...{ timeout: 500 }}>
                    <Paper elevation={3} sx={{ p: 2, height: 400 }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                            <Avatar {...stringAvatar(`${customer.firstName}`, true)}></Avatar>
                            <Typography sx={{ ml: 2, fontWeight: "bold" }}>{customer.firstName} {customer.lastName}</Typography>
                        </div>
                        <List sx={{ height: "100%" }}>
                            {itemsJSX}
                        </List>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={9}>
                <Grow in={true} {...{ timeout: 750 }}>
                    <Paper elevation={3} sx={{ p: 2, height: 400 }}>
                    </Paper>
                </Grow>
            </Grid>
        </React.Fragment>
    );
}

export default ShopCustomerSettingsPage;
