import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { AdminLoginForm, AdminLoginPageAnimation } from "../organism";

const AdminLoginPage = () => {
    return (
        <Grid container>
            <Grid item xs={12} xl={4}>
                <Paper sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Typography textAlign="left" variant="h3" sx={{width: "90%"}}>CMS Gommerce</Typography>
                    <AdminLoginForm />
                </Paper>
            </Grid>
            <Grid item xl={8}>
                <AdminLoginPageAnimation />
            </Grid>
        </Grid>
    );
}

export default AdminLoginPage;
