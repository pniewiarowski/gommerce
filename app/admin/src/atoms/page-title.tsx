import { Typography } from "@mui/material"

interface Props {
    title: string
}

const PageTitle = (props: Props) => {
    return (
        <Typography sx={{ fontSize: 20 }} variant="h2">
            {props.title}
        </Typography>
    );
}

export default PageTitle;
