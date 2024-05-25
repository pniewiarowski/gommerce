import { Grow, Grid, Paper } from "@mui/material";
import { AdminLoginForm, AdminLoginPageAnimation } from "../organism";

const AdminLoginPage = () => {
    return (
        <Grid container>
            <Grid item xs={12} xl={4}>
            <Grow in={true} {...{ timeout: 500 }}>
                    <Paper sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <AdminLoginForm />
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xl={8}>
                <AdminLoginPageAnimation />
            </Grid>
        </Grid>
    );
}

export default AdminLoginPage;
