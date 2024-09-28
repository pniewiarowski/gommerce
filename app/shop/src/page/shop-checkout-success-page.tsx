import { Fragment } from "react/jsx-runtime"
import { Link } from "react-router-dom";
import { Grid, Paper, Breadcrumbs, Typography } from "@mui/material";

const ShopCheckoutSuccessPage = () => {
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
        </Fragment>
    );
}

export default ShopCheckoutSuccessPage;
