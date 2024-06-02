import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Divider, Grid, Paper, Breadcrumbs } from "@mui/material";
import { UserContext } from "../context";
import { PageContainerGrid } from "../atoms";
import { AdminProductForm } from "../organism";

const AdminShopProductCreatePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <Typography sx={{ fontSize: 40, }} variant="h2">create product</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="text.primary">Shop</Typography>
                        </Link>
                        <Link to="/shop/category">
                            <Typography color="text.primary">Product</Typography>
                        </Link>
                        <Link to="/shop/category">
                            <Typography color="primary">Create</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <AdminProductForm />
                </Paper>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopProductCreatePage;
