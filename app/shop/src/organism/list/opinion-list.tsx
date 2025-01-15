import { Avatar, Box, Paper, Typography } from "@mui/material";
import { OpinionDefinition } from "gommerce-app-shared/api/definition";

interface Props {
    opinions: Array<OpinionDefinition>
}

const OpinionList = (props: Props) => {
    return (
        <Box>
            {props.opinions.map((opinion) => {
                return (
                    <Paper elevation={3} sx={{ p: 2, display: "flex", "alignItems": "center" }}>
                        <Avatar sx={{ width: "5rem", height: "5rem" }} />
                        <Typography variant="body1" sx={{ ml: 1.33, fontSize: "2rem" }}>
                            {opinion.comment}
                        </Typography>
                    </Paper>
                );
            })}
        </Box>
    )
}

export default OpinionList;
