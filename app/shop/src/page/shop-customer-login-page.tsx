import React, { useContext, useEffect } from "react";
import { Alert, Breadcrumbs, Grid, Grow, Paper, Typography, useMediaQuery, Zoom } from "@mui/material";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Check, Close, Info } from '@mui/icons-material';
import { CustomerLoginForm } from "../organism";
import { CustomerContext } from "../context";

const ShopCustomerLoginPage = () => {
    const navigate = useNavigate();
    const desktop: boolean = useMediaQuery('(min-width:1530px)');
    const { customer } = useContext(CustomerContext);

    useEffect(() => {
        if (customer) {
            navigate("/");
        }
    }, [customer]);

    const [query] = useSearchParams();

    return (
        <React.Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/login">
                            <Typography color="secondary">Login</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            {!!query.get("successRegister") &&
                <React.Fragment>
                    <Grid item xs={12}>
                        <Grow in={true} {...{ timeout: 250 }}>
                            <Alert icon={<Check fontSize="inherit" />} severity="success" sx={{ p: 2 }} variant={"standard"}>
                                <Typography>created account succesfully, now you can login to your new account!</Typography>
                            </Alert>
                        </Grow>
                    </Grid>
                </React.Fragment>
            }
            {!!query.get("message") &&
                <React.Fragment>
                    <Grid item xs={12}>
                        <Grow in={true} {...{ timeout: 250 }}>
                            <Alert icon={<Info fontSize="inherit" />} severity="info" sx={{ p: 2 }} variant={"standard"}>
                                <Typography>{query.get("message")}</Typography>
                            </Alert>
                        </Grow>
                    </Grid>
                </React.Fragment>
            }
            {!!query.get("errorLogin") &&
                <React.Fragment>
                    <Grid item xs={12}>
                        <Grow in={true} {...{ timeout: 250 }}>
                            <Alert icon={<Check fontSize="inherit" />} severity="error" sx={{ p: 2 }} variant={"standard"}>
                                <Typography>{query.get("errorLogin")}</Typography>
                            </Alert>
                        </Grow>
                    </Grid>
                </React.Fragment>
            }
            <Grid item xs={12} xl={6}>
                <Grow in={true} {...{ timeout: 500 }}>
                    <Paper elevation={3}>
                        <CustomerLoginForm />
                    </Paper>
                </Grow>
            </Grid>
            {desktop && <Grid item xs={12} xl={6}>
                <Paper elevation={1}
                    sx={{ minHeight: "650px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Zoom in={true}>
                        <Close style={{ fontSize: "400px", color: "#00000044" }} />
                    </Zoom>
                </Paper>
            </Grid>}
        </React.Fragment>
    );
}

export default ShopCustomerLoginPage;