import React from "react";
import {Grid, Paper} from "@mui/material";

const Footer = (): React.JSX.Element => {
    return (
        <Grid item xs={12}>
            <Paper sx={{width: "100%", p: 1}}>
                footer
            </Paper>
        </Grid>
    );
}

export default Footer;
