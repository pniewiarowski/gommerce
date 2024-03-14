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
import {ProductDefinition} from "../api/definition";

interface Props {
    from: ProductDefinition
}

const ProductTile = (props: Props): React.JSX.Element => {
    return (
        <Card sx={{p: 0}} elevation={3}>
            <CardMedia
                component="img"
                height="200"
                image="https://static.nike.com/a/images/t_default/5ef71bd0-dde7-4ac1-a1ed-2c4783398703/buty-dla-duzych-air-max-90-ltr-Twq87M.png"
                alt={props.from.name}
            />
            <CardContent>
                <Typography textAlign="center" variant="h4" component="h4">
                    {props.from.name} [ {props.from.price}PLN ]
                </Typography>
            </CardContent>
            <CardActions>
                <form style={{width: "100%"}}>
                    <FormControl fullWidth>
                        <Button sx={{p: 2}}>Add to Card</Button>
                    </FormControl>
                </form>
            </CardActions>
        </Card>
    );
}

export default ProductTile;
