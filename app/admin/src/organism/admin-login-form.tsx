import React from "react";
import { Button, Container, FormControl, InputAdornment, TextField } from "@mui/material";
import { Email, Key } from "@mui/icons-material";

const AdminLoginForm = () => {
    return (
        <React.Fragment>
            <Container>
                <FormControl sx={{ mb: 2, mt: 4 }} fullWidth>
                    <TextField label="email"
                        variant="outlined"
                        color="primary"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }} />
                    <FormControl sx={{ mb: 2, mt: 2 }} fullWidth>
                        <TextField label="password"
                            variant="outlined"
                            color="primary"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key />
                                    </InputAdornment>
                                ),
                            }} />
                    </FormControl>
                    <FormControl fullWidth>
                        <Button sx={{ p: 2, mt: 2 }} variant="contained" style={{ textAlign: 'left' }} type="submit">login</Button>
                    </FormControl>
                </FormControl>
            </Container>
        </React.Fragment>
    );
}

export default AdminLoginForm;
