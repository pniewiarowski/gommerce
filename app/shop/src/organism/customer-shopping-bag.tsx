import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ListItem, Typography, IconButton, Divider, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { useCookies } from "gommerce-app-shared/hook";
import { ShopBagContext } from "../context";

interface Props {
    close?: () => void;
    checkoutLink?: boolean;
}

const CustomerShoppingBag = (props: Props) => {
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { set } = useCookies();

    const deleteItemFromBag = (indexToDelete: number) => {
        const updated = shopBag.filter((_: ProductDefinition, index: number) => {
            return index !== indexToDelete;
        });

        set("gommerce-shop-bag", JSON.stringify(updated));
        setShopBag(updated);
    }

    return (
        <Fragment>
            {shopBag.map((item: ProductDefinition, index) => {
                return (
                    <Fragment>
                        <ListItem sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                            <Link onClick={props.close} to={`/product/${item.id}`}>
                                <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Typography>
                                <Typography sx={{ fontWeight: "light", fontSize: 12 }}>{item.price}$</Typography>
                            </Link>
                            <IconButton onClick={() => deleteItemFromBag(index)}>
                                <Delete color="error" />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </Fragment>
                );
            })}
            {
                props.checkoutLink && shopBag.length !== 0 &&
                <Link to={`/checkout`}>
                    <Button
                        fullWidth
                        sx={{ p: 2, mb: shopBag.length > 4 ? 3 : 0 }}
                        variant="contained"
                        onClick={props.close}
                    >
                        go to checkout
                    </Button>
                </Link>
            }
        </Fragment >
    )
}

export default CustomerShoppingBag;
