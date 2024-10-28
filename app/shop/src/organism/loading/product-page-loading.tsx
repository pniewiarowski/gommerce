import { Grid, Paper, Skeleton } from "@mui/material";

const ProductPageLoading = () => {
    return (
        <Grid sx={{ mt: 1 }} item xs={12}>
            <Grid item container xs={12} spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 1 }}>
                        <Skeleton variant="rectangular" height={700} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 1 }}>
                        <Skeleton variant="rectangular" height={700} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductPageLoading;