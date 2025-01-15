import { Fragment } from "react";
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { Link } from "react-router-dom";

interface Props {
    products: Array<ProductDefinition>
}

const ProductList = (props: Props) => {
    return (
        <List>
            {props.products.map((product) =>
                <Fragment>
                    <Link to={`/product/${product.id}`}>
                        <ListItemButton>
                            <ListItemIcon>
                                <img width={80} src={product.imageURL} />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" sx={{ fontSize: "1.5rem", ml: "2rem" }}>
                                    <b>{product.name}</b> for <b>{product.price}</b>$
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        <Divider />
                    </Link>
                </Fragment>
            )}
        </List>
    );
}

export default ProductList;
