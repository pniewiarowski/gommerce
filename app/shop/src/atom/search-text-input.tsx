import { styled, InputBase } from "@mui/material";

const SearchTextInput = styled(InputBase)(({ theme }) => ({
    color: "#333",
    width: "100%",
    padding: "0.5rem",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "40ch",
            },
        },
    },
}));

export default SearchTextInput;
