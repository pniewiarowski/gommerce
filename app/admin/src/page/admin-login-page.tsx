import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import { AdminLoginForm, AdminLoginPageAnimation } from "../organism";
import { UserContext } from "../context";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <Grid container>
            <Grid item xs={12} xl={4}>
                <Paper sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} elevation={3}>
                    <Typography sx={{ width: "87%", textAlign: "left" }} variant="h3">admin panel</Typography>
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
