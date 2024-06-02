import { Paper } from "@mui/material"

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element>
}

const PaperButton = (props: Props) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                '&:hover': {
                    backgroundColor: "#ffffff00"
                }
            }}
        >
            {props.children}
        </Paper>
    )
}

export default PaperButton;
