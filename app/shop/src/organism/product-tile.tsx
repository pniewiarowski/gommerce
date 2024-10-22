import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography
} from "@mui/material";
import { Theme, useTheme } from "@mui/material";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { Link } from "react-router-dom";
import { Center } from "../atom";

interface Props {
    from: ProductDefinition
}

const ProductTile = (props: Props): React.JSX.Element => {
    const theme: Theme = useTheme();

    return (
        <Link to={`/product/${props.from.id}`}>
            <Button variant="outlined" sx={{ p: 0.1, m: 0, width: "100%" }}>
                <Card elevation={3} sx={{ width: "100%", p: 1, textAlign: "left" }}>
                    <CardMedia>
                        <Center style={{ height: "200px" }}>
                            <img src={props.from.imageURL} width={250} style={{ zIndex: 2 }} />
                        </Center>
                    </CardMedia>
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
