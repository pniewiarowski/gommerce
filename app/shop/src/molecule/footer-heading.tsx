import React from "react";
import {Typography} from "@mui/material";

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element> | string
}

const FooterHeading = (props: Props): React.JSX.Element => {
    return (
        <Typography variant="h4" sx={{pb: 2}}>
            {props.children}
        </Typography>
    );
}

export default FooterHeading;