import { Avatar, Box, Typography } from "@mui/material";
import { CustomerDefinition } from "gommerce-app-shared/api/definition";
import { Fragment } from "react/jsx-runtime";

interface Props {
    customer: CustomerDefinition
}

const CustomerBox = (props: Props) => {
    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: "50px", height: "50px", mr: 2 }} />
                <Typography variant="body1" sx={{ fontSize: 24 }}>{props.customer.firstName} {props.customer.lastName}</Typography>
            </Box>
        </Fragment>
    );
}

export default CustomerBox;
