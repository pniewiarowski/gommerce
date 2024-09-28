import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Grid, Grow, Paper, Typography } from "@mui/material";
import { AdminLoginForm, AdminLoginPageAnimation } from "../organism";
import { UserContext } from "../context";
import { Error } from "@mui/icons-material";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [query] = useSearchParams();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <Grid container>
            <Grid item xs={12} xl={4}>
                <Paper sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }} elevation={3}>
                    <Typography sx={{
                        width: "87%",
                        textAlign: "left"
                    }} variant="h3">admin panel</Typography>
                    {!!query.get("errorLogin") &&
                        <Grow in={true} {...{ timeout: 250 }}>
                            <Alert icon={<Error fontSize="inherit" />} severity="error" sx={{ width: "87%", m: 2 }}>
                                <Typography>{query.get("errorLogin")}</Typography>
                            </Alert>
                        </Grow>
                    }
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
