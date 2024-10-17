import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Rating,
    Typography
} from "@mui/material";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { Link } from "react-router-dom";
import { Center } from "../atom";

interface Props {
    from: ProductDefinition
}

const ProductTile = (props: Props): React.JSX.Element => {
    return (
        <Link to={`/product/${props.from.id}`}>
            <Button variant="outlined" sx={{ p: 0.1, m: 0, width: "100%" }}>
                <Card elevation={3} sx={{ width: "100%", p: 1, textAlign: "left" }}>
                    <Center style={{ height: "200px" }}>
                        <img src={props.from.imageURL} height={120} />
                    </Center>
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
