import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Divider, Grid, Paper, Breadcrumbs } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { UserContext } from "../../../context";
import { PageContainerGrid, PageTitle } from "../../../atoms";
import { AdminProductForm } from "../../../organism";

const AdminShopProductEditPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductDefinition | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const { productRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setProduct(await productRepository.getByID(Number(id)));
            setLoading(false);
        };

        fetch();
    }, []);

    if (loading) {
        return;
    }

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
                        <Link to="/shop/product">
                            <Typography color="text.primary">Product</Typography>
                        </Link>
                        <Link to={`/shop/product/edit/${id}`}>
                            <Typography color="primary">Edit</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <AdminProductForm default={product} />
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopProductEditPage;
