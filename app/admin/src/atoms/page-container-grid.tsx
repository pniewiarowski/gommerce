import { Grid, Paper } from "@mui/material"

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element>
}

const PageContainerGrid = (props: Props) => {
    return (
        <Grid item xs={12} xl={9} sx={{ height: "100vh" }}>
            <Paper sx={{ height: "100%", p: 2, pt: 3.9 }}>
                {props.children}
            </Paper>
        </Grid>
    )
}

export default PageContainerGrid;
