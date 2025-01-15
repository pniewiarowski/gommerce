import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Grid, Paper, Breadcrumbs, Typography, Box, Chip } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { OrderDefinition } from "gommerce-app-shared/api/definition";
import { JwtContext } from "../../context";
import { ProductList } from "../../organism/list";

const ShopCustomerOrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderDefinition | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { jwt } = useContext(JwtContext);
    const { ordersRepository } = useBackend();

    useEffect(() => {
        (async () => {
            setOrder(await ordersRepository.getByID(Number(id), jwt))
            setLoading(false);
        })();
    })

    if (loading) {
        return <></>;
    }

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
                        <Link to={`/${id}`}>
                            <Typography color="text.primary">{id}</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h3">Order {order?.id} <Chip label={order?.status} color="primary" size="small" sx={{ ml: 1 }} /> </Typography>
                        <Typography variant="body1" sx={{ fontSize: "2rem", fontWeight: "bold" }}>{order?.fullPrice}$</Typography>
                    </Box>
                    <ProductList products={order?.products ?? []} />
                </Paper>
            </Grid>
        </React.Fragment >
    );
}

export default ShopCustomerOrderPage;