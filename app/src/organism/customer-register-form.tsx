import React from "react";
import {Box, Button, FormControl, TextField, Theme, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";

const CustomerRegisterForm = (): React.JSX.Element => {
    const theme: Theme = useTheme();

    return (
        <form style={{width: "100%", padding: "1rem"}}>
            <Box sx={{p: 4, minHeight: "465px"}} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                <FormControl sx={{mb: 2}} fullWidth>
                    <Typography variant="h3">create your account</Typography>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="name" variant="outlined" color="primary"/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="email" variant="outlined" color="primary"/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="password" variant="outlined" color="primary"/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="repeat password" variant="outlined" color="primary"/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <Typography>you have account? click <Link to="/login" style={{color: theme.palette.primary.main}}>here</Link> to login</Typography>
                </FormControl>
                <FormControl fullWidth>
                    <Button sx={{p: 2}} variant="contained">register</Button>
                </FormControl>
            </Box>
        </form>
    );
}

export default CustomerRegisterForm;
