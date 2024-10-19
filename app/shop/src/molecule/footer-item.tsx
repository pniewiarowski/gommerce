import React from "react";
import { Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
    content: React.JSX.Element | Array<React.JSX.Element> | string,
    link: string
}

const FooterItem = (props: Props): React.JSX.Element => {
    return (
        <Link to={props.link}>
            <Typography variant="body1" color="secondary">
                {props.content}
            </Typography>
        </Link>
    );
}

export default FooterItem;