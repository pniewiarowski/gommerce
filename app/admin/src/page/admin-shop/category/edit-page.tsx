import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { UserContext } from "../../../context";
import { AdminBreadcrumbs, AdminCategoryForm } from "../../../organism";
import { PageContainerGrid } from "../../../atoms";

const AdminShopCategoryEditPage = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState<CategoryDefinition | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const { categoriesRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setCategory(await categoriesRepository.getByID(Number(id)))
            setLoading(false);
        };

        fetch();
    }, []);

    if (loading) {
        return;
    }

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Category", link: "/shop/category" },
                { label: "Edit", link: `/shop/category/edit/${id}` },
            ]} />
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 1, minHeight: "100vh" }}>
                    <AdminCategoryForm default={category} />
                </Paper>
            </Grid>
        </PageContainerGrid >
    );
}

export default AdminShopCategoryEditPage;
