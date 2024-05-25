import React from "react";
import { Container } from "@mui/material";

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element>
}

const FooterColumn = (props: Props): React.JSX.Element => {
    return (
        <Container sx={{display: "flex", flexDirection: "column"}}>
            {props.children}
        </Container>
    );
}

export default FooterColumn;