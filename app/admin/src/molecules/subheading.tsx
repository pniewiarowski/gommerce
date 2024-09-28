import { Typography } from "@mui/material";

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element> | string
}

const SubHeading = (props: Props) => {
    return (
        <Typography
            sx={{
                fontSize: 22,
                fontWeight: "bold",
                mb: 3,
                mt: 3,
            }}
            variant="h3">
            {props.children}
        </Typography>
    );
}

export default SubHeading;
