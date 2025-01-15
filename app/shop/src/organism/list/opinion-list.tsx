import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";
import { OpinionDefinition } from "gommerce-app-shared/api/definition";

interface Props {
    opinions: Array<OpinionDefinition>
}

const OpinionList = (props: Props) => {
    return (
        <Box>
            {props.opinions.map((opinion) => {
                return (
                    <Paper elevation={3} sx={{ p: 2, mt: 1, display: "flex", "alignItems": "center" }}>
                        <Avatar sx={{ width: "5rem", height: "5rem" }} />
                        <Box sx={{ ml: "1.33rem", display: "flex", flexDirection: "column" }}>
                            <Rating value={opinion.score} readOnly />
                            <Typography variant="body1" sx={{ fontSize: "2rem", mt: "0.25rem" }}>
                                {opinion.comment}
                            </Typography>
                        </Box>
                    </Paper>
                );
            })}
        </Box>
    )
}

export default OpinionList;
