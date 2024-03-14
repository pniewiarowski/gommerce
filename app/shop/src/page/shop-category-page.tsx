import React, {useEffect, useState} from "react";
import {Breadcrumbs, Grid, Grow, Paper, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import CategoryDefinition from "../api/definition/category-definition.ts";
import useBackend from "../hook/use-backend.ts";
import ProductDefinition from "../api/definition/product-definition.ts";
import {SentimentVeryDissatisfied} from "@mui/icons-material";
import {ProductTile} from "../organism";

const ShopCategoryPage = (): React.JSX.Element => {
    const {categoriesRepository} = useBackend();
    const {id} = useParams();

    const [category, setCategory] = useState<CategoryDefinition>();
    const [products, setProducts] = useState<Array<ProductDefinition>>([]);

    const [isLoading, setIsLoading] = useState(true);

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
        }

        fetchProducts();
    }, [category, id]);

    const productsToRender = products.map((product: ProductDefinition, index: number) => {
        return (
            <Grow in={true} {...{timeout: 250 * (index + 1)}}>
                <Grid item xs={12} md={6} xl={3}>
                    <ProductTile from={product}/>
                </Grid>
            </Grow>
        )
    });

    return (
        <React.Fragment>
            <Grid sx={{mt: 1}} item xs={12}>
                <Paper sx={{p: 1}}>
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

            {!!products.length &&
            <Grid item container xs={12} spacing={1}>
                {productsToRender}
            </Grid>}

            {!products.length &&
                <Grid item xs={12}>
                    <Grow in={true} {...{timeout: 250}}>
                        <Paper sx={{p: 10}}
                               style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography>
                                <SentimentVeryDissatisfied style={{fontSize: "10rem"}}/>
                            </Typography>
                            <Typography variant="h3">there are no products in this category...</Typography>
                        </Paper>
                    </Grow>
                </Grid>}
        </React.Fragment>
    );
}

export default ShopCategoryPage;
