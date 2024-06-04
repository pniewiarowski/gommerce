import React from "react";
import {
    Button,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { Link } from "react-router-dom";

interface Props {
    from: ProductDefinition
}

const ProductTile = (props: Props): React.JSX.Element => {
    return (
        <Link to={`/product/${props.from.id}`}>
            <Button variant="outlined" sx={{ p: 0, m: 0, height: "300px", width: "100%" }}>
                <Card elevation={3} sx={{ height: "100%", width: "100%" }}>
                    <CardContent>
                        <Typography textAlign="center" variant="h4" component="h4">
                            {props.from.name} [ {props.from.price}PLN ]
                        </Typography>
                    </CardContent>
                </Card>
            </Button>
        </Link>
    );
}

export default ProductTile;
