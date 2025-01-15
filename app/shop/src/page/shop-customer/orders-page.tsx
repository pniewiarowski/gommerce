import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Grid, Paper, Typography } from "@mui/material";
import { CustomerContext, JwtContext, UserContext } from "../../context";
import { OrderDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { OrderList } from "../../organism/list";

const ShopCustomerOrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Array<OrderDefinition>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { jwt } = useContext(JwtContext);
    const { customer } = useContext(CustomerContext);
    const { user } = useContext(UserContext);

    const { customersRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            setOrders(await customersRepository.getOrders(customer.id, jwt));
            setIsLoading(false);
        })();
    });

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
                    <Typography variant="h3">your orders</Typography>
                    <OrderList orders={orders} />
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default ShopCustomerOrdersPage;
