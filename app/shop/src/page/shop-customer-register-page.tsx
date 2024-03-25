import {Alert, Breadcrumbs, Grid, Grow, Paper, Typography, Zoom} from "@mui/material";
import React from "react";
import {Link, useSearchParams} from "react-router-dom";
import CustomerRegisterForm from "../organism/customer-register-form.tsx";
import {Check, Close} from "@mui/icons-material";

const ShopCustomerRegisterPage = (): React.JSX.Element => {
    const [query] = useSearchParams();

    return (
        <React.Fragment>
            <Grid sx={{mt: 1}} item xs={12}>
                <Paper sx={{p: 1}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/account">
                            <Typography color="text.primary">Account</Typography>
                        </Link>
                        <Link to="/login">
                            <Typography color="secondary">Register</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>

            {!!query.get("errorRegister") &&
                <React.Fragment>
                    <Grid item xs={12} spacing={1}>
                        <Grow in={true} {...{timeout: 250}}>
                            <Alert icon={<Check fontSize="inherit"/>} severity="error" sx={{p: 2}} variant={"outlined"}>
                                <Typography>{query.get("errorRegister")}</Typography>
                            </Alert>
                        </Grow>
                    </Grid>
                </React.Fragment>
            }

            <Grid item xs={12} xl={6}>
                <Paper elevation={1} sx={{minHeight: "575px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Zoom in={true}>
                        <Close style={{fontSize: "400px", color: "#00000044"}}/>
                    </Zoom>
                </Paper>
            </Grid>

            <Grid item xs={12} xl={6}>
                <Grow in={true} {...{timeout: 500}}>
                    <Paper elevation={3}>
                        <CustomerRegisterForm/>
                    </Paper>
                </Grow>
            </Grid>
        </React.Fragment>
    );
}

export default ShopCustomerRegisterPage;