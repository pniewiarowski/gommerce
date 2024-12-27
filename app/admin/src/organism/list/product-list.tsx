import { ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, List } from "@mui/material";
import { ProductDefinition } from "gommerce-app-shared/api/definition"
import { Fragment } from "react/jsx-runtime";

interface Props {
    products: Array<ProductDefinition>
}

const ProductList = (props: Props) => {
    return (
        <Box>
            <List>
                {props.products.map((product, index) =>
                    <Fragment>
                        <ListItem sx={{ p: 2 }}>
                            <ListItemIcon sx={{ mr: 4 }}>
                                <img width={90} src={product.imageURL} />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" sx={{ fontSize: 24 }}>{product.name} {product.price}$</Typography>
                            </ListItemText>
                        </ListItem>
                        {index !== props.products.length - 1 && <Divider />}
                    </Fragment>)
                }
            </List>
        </Box>
    );
}

export default ProductList;
