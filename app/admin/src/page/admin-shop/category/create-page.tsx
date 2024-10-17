import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Divider, Grid, Paper, Typography } from "@mui/material";
import { UserContext } from "../../../context";
import { AdminCategoryForm } from "../../../organism";
import { PageContainerGrid } from "../../../atoms";

const AdminShopCategoryCreatePage = () => {
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
                            <Typography color="text.primary">Shop</Typography>
                        </Link>
                        <Link to="/shop/category">
                            <Typography color="text.primary">Category</Typography>
                        </Link>
                        <Link to="/shop/category">
                            <Typography color="primary">Create</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <AdminCategoryForm />
                </Paper>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopCategoryCreatePage;
