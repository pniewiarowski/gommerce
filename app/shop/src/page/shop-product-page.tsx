import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Breadcrumbs, Button, FormControl, Grid, Grow, Paper, Rating, TextField, Typography } from "@mui/material";
import { Check, Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { useBackend, useCookies } from "gommerce-app-shared/hook";
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { ShopBagContext } from "../context";
import { ProductDescription } from "../atom";


const ShopProductPage = () => {
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { set } = useCookies();
    const { productRepository, categoriesRepository } = useBackend();
    const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);
    const [selectedQty, setSelectedQty] = useState<number>(1);
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
                setCategory(await categoriesRepository.getByID(product.categoryID));
            }
        }

        fetch();
    }, [id, product]);

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                setSucess("");
                setIsAddDisabled(false);
            }, 1500);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [success]);

    const addProductToBag = () => {
        const updatedShopBag = [...shopBag];
        for (let i = 0; i < selectedQty; i++) {
            updatedShopBag.push(product);
        }

        setShopBag(updatedShopBag);
        set("gommerce-shop-bag", JSON.stringify(updatedShopBag));
        setIsAddDisabled(true);
        setSucess(`you added ${product?.name} to your bag`);
    }

    const handleChangeQty = (event: Event) => {
        setSelectedQty(event.target.value);
    }

    if (!product) {
        return;
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
                        <Link to={`/category/${product?.categoryID}`}>
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
                    <Paper sx={{ p: 1, minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={product?.imageURL} width={600} />
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
                        <ProductDescription>
                            {product.description}
                        </ProductDescription>
                        <FormControl sx={{ width: "15%", mr: 2 }}>
                            <TextField label="qty" type="number" value={selectedQty} onChange={handleChangeQty} />
                        </FormControl>
                        <FormControl sx={{ width: "82%" }}>
                            {!isAddDisabled && <Button onClick={addProductToBag} sx={{ p: 2 }} variant="contained" fullWidth>
                                add to card
                            </Button>}
                            {isAddDisabled && <Button sx={{ p: 2 }} loading variant="contained" fullWidth>
                                product added
                            </Button>}
                        </FormControl>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>Opinions</Typography>
                    <Typography variant="body1">there are no opinion about this product yet</Typography>
                </Paper>
            </Grid>
        </Fragment >
    );
}

export default ShopProductPage;