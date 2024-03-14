import React from "react";
import {Box, Button, FormControl, InputAdornment, TextField, Theme, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {Email, Key} from "@mui/icons-material";

const CustomerLoginForm = (): React.JSX.Element => {
    const theme: Theme = useTheme();

    return (
        <form style={{width: "100%", padding: "1rem"}}>
            <Box sx={{p: 4, minHeight: "465px"}} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                <FormControl sx={{mb: 2}} fullWidth>
                    <Typography variant="h3">you are logout</Typography>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="email" variant="outlined" color="primary" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        ),
                    }}/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="password" variant="outlined" color="primary" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Key/>
                            </InputAdornment>
                        ),
                    }}/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <Typography>not have account yet? click <Link to="/register" style={{color: theme.palette.primary.main}}>here</Link> to register</Typography>
                </FormControl>
                <FormControl fullWidth>
                    <Button sx={{p: 2}} variant="contained" style={{textAlign: 'left'}}>login</Button>
                </FormControl>
            </Box>
        </form>
    );
}

export default CustomerLoginForm;
