import { Button, Grow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    backLink: string;
    type: "save" | "create" | "setting";
}

const ResourceFormViewAction = (props: Props) => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Grow in={true} {...{ timeout: 500 }}>
                <Button sx={{ mr: 1 }} color="error" variant="outlined" onClick={() => navigate(props.backLink)}>
                    back
                </Button>
            </Grow>

            {props.type === "save" && <Grow in={true} {...{ timeout: 750 }}>
                <Button sx={{ mr: 1 }} color="error" variant="contained" onClick={() => navigate(props.backLink)}>
                    delete
                </Button>
            </Grow>}


            <Grow in={true} {...{ timeout: 1000 }}>
                <Button color="primary" variant="contained" type="submit">
                    {props.type === "save" && "save"}
                    {props.type === "setting" && "save"}
                    {props.type === "create" && "create"}
                </Button>
            </Grow>
        </React.Fragment>
    );
}

export default ResourceFormViewAction;
