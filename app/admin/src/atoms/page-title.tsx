import React from "react";
import { Divider, Typography } from "@mui/material"

interface Props {
    title: string
}

const PageTitle = (props: Props) => {
    return (
        <React.Fragment>
            <Typography sx={{ fontSize: 20 }} variant="h2">
                {props.title}
            </Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
        </React.Fragment>
    );
}

export default PageTitle;
