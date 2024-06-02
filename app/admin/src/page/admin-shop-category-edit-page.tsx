import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Divider, Grid, Paper, Typography } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { UserContext } from "../context";
import { AdminCategoryForm } from "../organism";
import { PageContainerGrid } from "../atoms";

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
            <Typography sx={{ fontSize: 40, }} variant="h2">edit category</Typography>
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
                            <Typography color="text.primary">Category</Typography>
                        </Link>
                        <Link to={`/shop/category/edit/${id}`}>
                            <Typography color="primary">Edit</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <AdminCategoryForm default={category} />
                </Paper>
            </Grid>
        </PageContainerGrid >
    );
}

export default AdminShopCategoryEditPage;
