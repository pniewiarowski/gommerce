import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
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
            <Button variant="outlined" sx={{ p: 0.1, m: 0, width: "100%" }}>
                <Card elevation={3} sx={{ height: "100%", width: "100%", p: 1, textAlign: "left" }}>
                    <CardMedia
                        sx={{ height: 155 }}
                        image=""
                        title={props.from.name}
                    />
                    <CardContent>
                        <Typography variant="h3" sx={{ fontSize: 30, fontWeight: "black" }}>
                            {props.from.name}
                        </Typography>
                        <Typography variant="h4" sx={{ fontSize: 20, fontWeight: "light" }}>
                            {props.from.price}$
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button variant="contained">show</Button>
                        <Rating name="read-only" value={0} readOnly />
                    </CardActions>
                </Card>
            </Button>
        </Link >
    );
}

export default ProductTile;
