import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Breadcrumbs, Button, Grid, Grow, Paper, Rating, Typography } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { ShopBagContext } from "../context";
import { Check, Favorite, FavoriteBorderOutlined } from "@mui/icons-material";


const ShopProductPage = () => {
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { productRepository, categoriesRepository } = useBackend();
    const [success, setSucess] = useState<string>("");
    const [product, setProduct] = useState<ProductDefinition>();
    const [category, setCategory] = useState<CategoryDefinition>();
    const [followIconHovered, setFollowIconHovered] = useState<boolean>(false);
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            if (!product) {
                setProduct(await productRepository.getByID(Number(id)));
                return;
            }

            if (!category) {
                setCategory(await categoriesRepository.getByID(product.categoryId));
            }
        }

        fetch();
    }, [id, product]);

    const add = () => {
        setShopBag([...shopBag, product]);
        setSucess(`you added ${product?.name} to your bag`);
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
                        <Link to={`/category/${product?.categoryId}`}>
                            <Typography color="text.primary">{category?.name}</Typography>
                        </Link>
                        <Link to={`/product/${product?.id}`}>
                            <Typography color="secondary">{product?.name}</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            {success.length !== 0 &&
                <Grid item xs={12}>
                    <Grow in={true} {...{ timeout: 250 }}>
                        <Alert icon={<Check fontSize="inherit" />} severity="success" sx={{ p: 2 }} variant={"standard"}>
                            <Typography>{success}</Typography>
                        </Alert>
                    </Grow>
                </Grid>
            }
            <Grid item xs={12} xl={6}>
                <Grow in={true} timeout={250}>
                    <Paper sx={{ p: 1, minHeight: "100%" }}>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Grow in={true} timeout={500}>
                    <Paper sx={{ p: 4, minHeight: "650px" }} elevation={3}>
                        <div onMouseEnter={() => setFollowIconHovered(true)} onMouseLeave={() => setFollowIconHovered(false)} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Typography variant="h3" sx={{ fontSize: 48 }}>{product?.name}</Typography>
                            {!followIconHovered && <FavoriteBorderOutlined sx={{ color: "#cf2334", fontSize: 48, cursor: "pointer" }} />}
                            {followIconHovered && <Favorite sx={{ color: "#cf2334", fontSize: 48, cursor: "pointer" }} />}
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant="body1" sx={{ fontSize: 24, fontWeight: "light" }}>{product?.price}$</Typography>
                            <Rating sx={{ ml: 2 }} disabled />
                        </div>
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
                            add to card
                        </Button>
                    </Paper>
                </Grow>
            </Grid>
        </Fragment >
    );
}

export default ShopProductPage;