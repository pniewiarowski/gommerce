import { Fragment } from "react";
import { Link } from "react-router-dom";
import { LocalShipping } from "@mui/icons-material";
import { Box, Chip, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { OrderDefinition } from "gommerce-app-shared/api/definition";

interface Props {
    orders: Array<OrderDefinition>
}

const OrderList = (props: Props) => {
    return (
        <List>
            {props.orders.map((order) =>
                <Fragment>
                    <Link to={`/order/${order.id}`}>
                        <ListItemButton>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <ListItemIcon>
                                    <LocalShipping />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography> Order number</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontSize: "1.33rem" }}>{order.id}</Typography>
                                </ListItemText>
                                <Typography>
                                    <Chip color="primary" size="medium" label={order.status ? order.status : 'unknown'} />
                                </Typography>
                            </Box>
                        </ListItemButton>
                    </Link>
                    <Divider />
                </Fragment>
            )}
        </List>
    )
}

export default OrderList;
