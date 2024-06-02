import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    Typography
} from "@mui/material";
import { ProductDefinition } from "../api/definition";

interface Props {
    from: ProductDefinition
}

const ProductTile = (props: Props): React.JSX.Element => {
    return (
        <Card sx={{ p: 0 }} elevation={3}>
            <CardContent>
                <Typography textAlign="center" variant="h4" component="h4">
                    {props.from.name} [ {props.from.price}PLN ]
                </Typography>
            </CardContent>
            <CardActions>
                <form style={{ width: "100%" }}>
                    <FormControl fullWidth>
                        <Button sx={{ p: 2 }}>Add to Card</Button>
                    </FormControl>
                </form>
            </CardActions>
        </Card>
    );
}

export default ProductTile;
