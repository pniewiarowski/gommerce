import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Button, Divider, Grid, Grow, List, Paper, Typography } from "@mui/material";
import { CustomerContext, ShopBagContext } from "../context";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { CustomerShoppingBag } from "../organism";

const ShopCheckoutPage = () => {
    const { shopBag } = useContext(ShopBagContext);
    const [fullPrice, setFullPrice] = useState<number>(0);
    const [fullQty, setFullQty] = useState<number>(0);
    const { customer } = useContext(CustomerContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!customer) {
            navigate('/login?message=you need to be logged in to go to checkout');
        }
    }, []);

    useEffect(() => {
        let price = 0;
        let qty = 0;
        shopBag.forEach((product: ProductDefinition) => {
            price += product.price;
            qty += 1;
        });

        setFullPrice(price);
        setFullQty(qty);
    }, [shopBag]);

    return (
        <Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs>
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/checkout">
                            <Typography color="secondary">Checkout</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={8}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper sx={{ p: 4, height: 500, overflowY: "scroll" }}>
                        <Typography variant="h3" sx={{ mb: 2 }}>your items in shoping bag</Typography>
                        <List>
                            <CustomerShoppingBag />
                        </List>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12} xl={4}>
                <Grow in={true} {...{ timeout: 500 }}>
                    <Paper sx={{ p: 3, height: 500, overflowY: "scroll", display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={3}>
                        <Box>
                            <Typography variant="h3">shoping bag summary</Typography>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box>
                                <Paper elevation={5} sx={{ mb: 1, p: 2, display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body1">products cost</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{fullPrice}$</Typography>
                                </Paper>
                                <Paper elevation={5} sx={{ mb: 1, p: 2, display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body1">delivery</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>0$</Typography>
                                </Paper>
                            </Box>
                        </Box>
                        <Box>
                            <Paper elevation={10} sx={{ mb: 2, p: 2, display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="body1">to pay (include VAT)</Typography>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>{fullPrice}$</Typography>
                            </Paper>
                            <Link to="/checkout/address">
                                <Button variant="contained" fullWidth sx={{ p: 2 }}>go next</Button>
                            </Link>
                        </Box>
                    </Paper>
                </Grow>
            </Grid >
        </Fragment >
    );
}

export default ShopCheckoutPage;
