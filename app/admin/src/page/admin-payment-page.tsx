import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { PageContainerGrid } from "../atoms";
import { Grid, Paper, Breadcrumbs, Typography } from "@mui/material";

const AdminPaymentPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <Grid item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="primary">Payment</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminPaymentPage;
