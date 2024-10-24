import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { UserContext } from "../../../context";
import { AdminBreadcrumbs, AdminCategoryForm } from "../../../organism";
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
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Category", link: "/shop/category" },
                { label: "Create", link: "/shop/category/create" },
            ]} />
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 1, minHeight: "100vh" }}>
                    <AdminCategoryForm />
                </Paper>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopCategoryCreatePage;
