import React from "react";
import {Alert, Breadcrumbs, Grid, Grow, Paper, Typography, Zoom} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import {Check, Close} from '@mui/icons-material';
import {CustomerLoginForm} from "../organism";

const ShopCustomerLoginPage = (): React.JSX.Element => {
    const [query] = useSearchParams();
    console.log(query.get("x"))
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
            {!!query.get("successRegister") &&
                <React.Fragment>
                    <Grid item xl={12} spacing={1}>
                        <Grow in={true} {...{timeout: 250}}>
                            <Alert icon={<Check fontSize="inherit"/>} severity="success" sx={{p: 2}} variant={"outlined"}>
                                <Typography>created account succesfully, now you can login to your new account!</Typography>
                            </Alert>
                        </Grow>
                    </Grid>
                </React.Fragment>
            }
            <Grid item xs={12} xl={6} spacing={1}>
                <Grow in={true} {...{timeout: 500}}>
                    <Paper elevation={3}>
                        <CustomerLoginForm/>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12} xl={6} spacing={1}>
                <Paper elevation={1}
                       sx={{minHeight: "575px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Zoom in={true}>
                        <Close style={{fontSize: "400px", color: "#00000044"}}/>
                    </Zoom>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default ShopCustomerLoginPage;