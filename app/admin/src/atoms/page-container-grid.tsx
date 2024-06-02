import { Grid, Grow, Paper } from "@mui/material"

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element>
}

const PageContainerGrid = (props: Props) => {
    return (
        <Grid item xs={12} xl={9} sx={{ height: "100vh", pl: 1, pr: 1 }}>
            <Paper sx={{ height: "100%", p: 4 }}>
                {props.children}
            </Paper>
        </Grid>
    )
}

export default PageContainerGrid;
