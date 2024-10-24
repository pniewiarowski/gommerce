import { Link } from "react-router-dom";
import { Breadcrumbs, Grid, Grow, Paper, Typography } from "@mui/material";

interface Breadcrumb {
    link: string,
    label: string,
}

interface Props {
    breadcrumbs: Array<Breadcrumb>,
}

const AdminBreadcrumbs = (props: Props) => {
    const lastItemIndex = props.breadcrumbs.length - 1;
    const toRender = props.breadcrumbs.map((item, index) => {
        return (
            <Link to={item.link}>
                <Typography color={lastItemIndex === index ? "primary" : "text.primary"}>
                    {item.label}
                </Typography>
            </Link>
        )
    })

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    {toRender}
                </Breadcrumbs>
            </Paper>
        </Grid>
    )
}

export default AdminBreadcrumbs;
