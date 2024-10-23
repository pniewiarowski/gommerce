import { Typography } from "@mui/material"

interface Props {
    children: React.JSX.Element | Array<React.JSX.Element> | string
}

const ProductDescription = (props: Props) => {
    const style = {
        fontSize: 20,
        fontWeight: "light",
        mt: 4,
        mb: 4,
        textAlign: "justify",
    }

    return (
        <Typography variant="body1" sx={style}>
            {props.children}
        </Typography>
    );
}

export default ProductDescription;
