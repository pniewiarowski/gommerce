import { Fragment } from "react";
import { Breadcrumbs, Grid, Grow, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ShopHomePage = () => {
    return (
        <Fragment>
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Grow in={true}>
                    <Paper sx={{ height: "408px", p: 1, display: "flex", justifyContent: "center", alignItems: "center" }} elevation={1}>
                        <img style={{ transform: "scaleX(-1)" }} src="go-logo.png" width={250} />
                    </Paper>
                </Grow>
            </Grid>
            <Grid item xs={12} xl={6}>
                <Grid container spacing={1}>
                    <Grow in={true} {...{ timeout: 250 }}>
                        <Grid item xs={6}>
                            <Paper sx={{ p: 1, mb: 1, height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src="react-logo.png" width={150} />
                            </Paper>
                        </Grid>
                    </Grow>
                    <Grow in={true} {...{ timeout: 500 }}>
                        <Grid item xs={6}>
                            <Paper sx={{ p: 1, mb: 1, height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src="mui-logo.png" width={150} />
                            </Paper>
                        </Grid>
                    </Grow>
                </Grid>
                <Grid container spacing={1}>
                    <Grow in={true} {...{ timeout: 750 }}>
                        <Grid item xs={6}>
                            <Paper sx={{ p: 1, height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src="docker-logo.png" width={150} />
                            </Paper>
                        </Grid>
                    </Grow>
                    <Grow in={true} {...{ timeout: 1000 }}>
                        <Grid item xs={6}>
                            <Paper sx={{ p: 1, height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Typography color={"text"} sx={{ fontSize: 32, fontWeight: "bold" }}>and more...</Typography>
                            </Paper>
                        </Grid>
                    </Grow>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ShopHomePage;
