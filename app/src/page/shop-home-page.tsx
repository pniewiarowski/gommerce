import React from "react";
import {Box, Grid, Paper} from "@mui/material";

const ShopHomePage = (): React.JSX.Element => {
    return (
        <Box>
            <Grid sx={{width: "60%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={4} xl={6} spacing={1}>
                    <Paper sx={{height: "408px", p: 1}} elevation={1}>
                        1
                    </Paper>
                </Grid>
                <Grid sx={{mt: 1}} item xs={4} xl={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, mb: 1, height: "200px"}}>2</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, mb: 1, height: "200px"}}>3</Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, mb: 1, height: "200px"}}>4</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper sx={{p: 1, mb: 1, height: "200px"}}>5</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShopHomePage;
