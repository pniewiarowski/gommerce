import { useNavigate } from "react-router-dom";
import { Grid, Grow, Button } from "@mui/material";

interface Props {
    backLink: string,
    createLink: string,
}

const ResourceMainViewAction = (props: Props) => {
    const navigate = useNavigate();

    return (
        <Grid sx={{ mt: 1.5 }} item xs={12}>
            <Grow in={true} {...{ timeout: 500 }}>
                <Button sx={{ mr: 1 }} color="error" variant="outlined" onClick={() => navigate(props.backLink)}>
                    back
                </Button>
            </Grow>
            <Grow in={true} {...{ timeout: 750 }}>
                <Button color="primary" variant="contained" onClick={() => navigate(props.createLink)}>
                    add
                </Button>
            </Grow>
        </Grid>
    )
}

export default ResourceMainViewAction;
