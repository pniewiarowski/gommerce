import { Fragment } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
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
                                <img width={100} src={product.imageURL} />
                            </ListItemIcon>
                        </ListItemButton>
                        <Divider />
                    </Link>
                </Fragment>
            )}
        </List>
    );
}

export default ProductList;
