import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { UserContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";
import { AdminBreadcrumbs, AdminProductForm } from "../../../organism";

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
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Product", link: "/shop/product" },
                { label: "Create", link: "/shop/product/create" },
            ]} />
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 1, minHeight: "100vh" }}>
                    <AdminProductForm />
                </Paper>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopProductCreatePage;
