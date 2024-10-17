import { Grid, Paper } from "@mui/material"

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element>
}

const PageContainerGrid = (props: Props) => {
    return (
        <Grid item xs={12} xl={10.5} sx={{ height: "100vh" }}>
            <Paper sx={{ height: "100%", p: 1 }}>
                {props.children}
            </Paper>
        </Grid >
    )
}

export default PageContainerGrid;
