import { Grow, Paper } from "@mui/material";

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element>
    onSubmit: React.FormEventHandler<HTMLFormElement | undefined>
}

const PaperForm = (props: Props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <Grow in={true} {...{ timeout: 250 }}>
                <Paper elevation={3} sx={{ minHeight: "95vh", p: 2, mb: 1 }}>
                    {props.children}
                </Paper>
            </Grow>
        </form>
    );
}

export default PaperForm;
