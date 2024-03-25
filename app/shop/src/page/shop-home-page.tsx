import React from "react";
import {Breadcrumbs, Grid, Grow, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ShopHomePage = (): React.JSX.Element => {
    return (
        <React.Fragment>
            <Grid sx={{mt: 1}} item xs={12}>
                <Paper sx={{p: 1}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Grow in={true}>
                    <Paper sx={{height: "408px", p: 1}} elevation={1}>
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Grid container spacing={1}>
                    <Grow in={true} {...{timeout: 250}}>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, mb: 1, height: "200px"}}></Paper>
                        </Grid>
                    </Grow>
                    <Grow in={true} {...{timeout: 500}}>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, mb: 1, height: "200px"}}></Paper>
                        </Grid>
                    </Grow>
                </Grid>
                <Grid container spacing={1}>
                    <Grow in={true} {...{timeout: 750}}>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, height: "200px"}}></Paper>
                        </Grid>
                    </Grow>
                    <Grow in={true} {...{timeout: 1000}}>
                        <Grid item xs={6}>
                            <Paper sx={{height: "200px"}}></Paper>
                        </Grid>
                    </Grow>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ShopHomePage;
