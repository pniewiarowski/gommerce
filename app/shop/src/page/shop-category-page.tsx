import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Grid, Grow, Paper, Typography } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { ProductTile } from "../organism";
import { ProductGridLoading } from "../organism/loading";

const ShopCategoryPage = () => {
    const { categoriesRepository } = useBackend();
    const { id } = useParams();

    const [category, setCategory] = useState<CategoryDefinition>();
    const [products, setProducts] = useState<Array<ProductDefinition>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategory = async () => {
            setCategory(await categoriesRepository.getByID(Number(id)));
        }

        fetchCategory();
    }, [id]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!category) {
                return;
            }

            setProducts(await categoriesRepository.getProducts(category.id));
            setLoading(false);
        }

        fetchProducts();
    }, [category, id]);

    if (loading) {
        return <ProductGridLoading />
    }

    const productsToRender = products && products.map((product: ProductDefinition, index: number) => {
        return (
            <Grow in={true} {...{ timeout: 250 * (index + 1) }}>
                <Grid item xs={12} md={6} xl={3}>
                    <ProductTile from={product} />
                </Grid>
            </Grow>
        )
    });

    return (
        <React.Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/category">
                            <Typography color="text.primary">Category</Typography>
                        </Link>
                        <Link to={`/category/${category?.id}`}>
                            <Typography color="secondary">{category?.name}</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            {products && !!products.length &&
                <Grid item container xs={12} spacing={1}>
                    {productsToRender}
                </Grid>}
            {!products &&
                <Grid item xs={12}>
                    <Grow in={true} timeout={250}>
                        <Paper sx={{ p: 10 }}
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography>
                                <SentimentVeryDissatisfied style={{ fontSize: "10rem" }} />
                            </Typography>
                            <Typography variant="h3">there are no products in this category...</Typography>
                        </Paper>
                    </Grow>
                </Grid>}
        </React.Fragment>
    );
}

export default ShopCategoryPage;
