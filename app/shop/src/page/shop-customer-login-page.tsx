import React from "react";
import {Breadcrumbs, Grid, Grow, Paper, Typography, Zoom} from "@mui/material";
import {Link} from "react-router-dom";
import {Close} from '@mui/icons-material';
import {CustomerLoginForm} from "../organism";

const ShopCustomerLoginPage = (): React.JSX.Element => {
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
                            <Typography color="secondary">Login</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={6} spacing={1}>
                <Grow in={true} {...{timeout: 250}}>
                    <Paper elevation={3}>
                        <CustomerLoginForm/>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12} xl={6} spacing={1}>
                <Paper elevation={1} sx={{minHeight: "490px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Zoom in={true}>
                        <Close style={{fontSize: "400px", color: "#00000044"}}/>
                    </Zoom>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default ShopCustomerLoginPage;