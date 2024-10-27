import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { Grid, Paper, Breadcrumbs, Typography, Grow, Step, Stepper, StepLabel } from "@mui/material";
import { SummaryOrderForm } from "../../organism";

const ShopCheckoutSummaryPage = () => {
    return (
        <Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs>
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/checkout">
                            <Typography color="text.primary">Checkout</Typography>
                        </Link>
                        <Link to="/checkout/summary">
                            <Typography color="secondary">Summary</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={3}>
                <Paper sx={{ p: 2, height: "750px" }}>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={3}>
                <Paper sx={{ p: 2, minHeight: "750px" }}>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Grow in={true} {...{ timeout: 500 }}>
                    <Paper elevation={7} sx={{ p: 2, height: "750px" }}>
                        <SummaryOrderForm />
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 4 }}>
                    <Stepper activeStep={2} alternativeLabel>
                        <Step>
                            <StepLabel>enter delivery address</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>choose payment method</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>order summary</StepLabel>
                        </Step>
                    </Stepper>
                </Paper>
            </Grid>
        </Fragment >
    );
}

export default ShopCheckoutSummaryPage;
