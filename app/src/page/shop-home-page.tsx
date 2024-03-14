import React from "react";
import {Box, Breadcrumbs, Grid, Grow, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ShopHomePage = (): React.JSX.Element => {
    return (
        <Box>
            <Grid sx={{width: "70%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={12}>
                    <Paper sx={{p: 1}}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/">
                                <Typography color="text.primary">Home</Typography>
                            </Link>
                        </Breadcrumbs>
                    </Paper>
                </Grid>
                <Grid item xl={6} spacing={1}>
                    <Grow in={true}>
                        <Paper sx={{height: "408px", p: 1}} elevation={1}>
                            1
                        </Paper>
                    </Grow>
                </Grid>
                <Grid item xs={12} xl={6}>
                    <Grid container spacing={1}>
                        <Grow in={true} {...{timeout: 250}}>
                            <Grid item xs={6}>
                                <Paper sx={{p: 1, mb: 1, height: "200px"}}>2</Paper>
                            </Grid>
                        </Grow>
                        <Grow in={true} {...{timeout: 500}}>
                            <Grid item xs={6}>
                                <Paper sx={{p: 1, mb: 1, height: "200px"}}>3</Paper>
                            </Grid>
                        </Grow>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grow in={true} {...{timeout: 750}}>
                            <Grid item xs={6}>
                                <Paper sx={{p: 1, mb: 1, height: "200px"}}>4</Paper>
                            </Grid>
                        </Grow>
                        <Grow in={true} {...{timeout: 1000}}>
                            <Grid item xs={6}>
                                <Paper sx={{p: 1, mb: 1, height: "200px"}}>5</Paper>
                            </Grid>
                        </Grow>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShopHomePage;
