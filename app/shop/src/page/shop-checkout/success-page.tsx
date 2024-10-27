import { Link } from "react-router-dom";
import { Fragment } from "react"
import { Grid, Paper, Breadcrumbs, Typography, useTheme, Theme, Box } from "@mui/material";

const ShopCheckoutSuccessPage = () => {
    const theme: Theme = useTheme();

    return (
        <Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs>
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/checkout">
                            <Typography color="secondary">Success</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h2" fontWeight="bold" sx={{ mb: 1 }} color={theme.palette.success.main}>success</Typography>
                    <Typography variant="body1">you can follow your order from your account menu or you can make new order</Typography>
                    <Box sx={{ display: "flex", justifyContent: "end", transform: "translateY(16px) translateX(-45px)" }}>
                        <img src="/goopher-look-up.png" />
                    </Box>
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default ShopCheckoutSuccessPage;
