import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Breadcrumbs, Button, Grid, Grow, Paper, Typography } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { ShopBagContext } from "../context";
import { Check } from "@mui/icons-material";


const ShopProductPage = () => {
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { productRepository, categoriesRepository } = useBackend();
    const [success, setSucess] = useState<string>("");
    const [product, setProduct] = useState<ProductDefinition>();
    const [category, setCategory] = useState<CategoryDefinition>();
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            setProduct(await productRepository.getByID(Number(id)));
            if (!product) {
                return;
            }

            setCategory(await categoriesRepository.getByID(product.categoryId));
        }

        fetch();
    }, [id]);

    const add = () => {
        setShopBag([...shopBag, product]);
        setSucess(`you add ${product?.name} to your bad`);
    }

    return (
        <Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/category">
                            <Typography color="text.primary">Category</Typography>
                        </Link>
                        <Link to={`/category/${product?.id}`}>
                            <Typography color="secondary">{product?.name}</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            {success.length !== 0 &&
                <Grid item xs={12}>
                    <Grow in={true} {...{ timeout: 250 }}>
                        <Alert icon={<Check fontSize="inherit" />} severity="success" sx={{ p: 2 }} variant={"outlined"}>
                            <Typography>{success}</Typography>
                        </Alert>
                    </Grow>
                </Grid>
            }

            <Grid item xs={12} xl={6}>
                <Paper sx={{ p: 1, minHeight: "500px" }}>

                </Paper>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Paper sx={{ p: 4, minHeight: "500px" }} elevation={3}>
                    <Typography variant="h3" sx={{ fontSize: 48 }}>{product?.name}</Typography>
                    <Typography variant="body1" sx={{ fontSize: 20, fontWeight: "light" }}>{category?.name}</Typography>
                    <Typography variant="body1" sx={{
                        fontSize: 20,
                        fontWeight: "light",
                        mt: 4,
                        mb: 4,
                        textAlign: "justify",
                    }}>{product?.description}</Typography>
                    <Button
                        onClick={add}
                        sx={{ p: 2 }}
                        variant="contained"
                        fullWidth
                    >
                        buy
                    </Button>
                </Paper>
            </Grid>
        </Fragment>
    );
}

export default ShopProductPage;