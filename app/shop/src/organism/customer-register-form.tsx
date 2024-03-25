import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Person, Key, Repeat, Email} from "@mui/icons-material";
import {Box, Button, FormControl, InputAdornment, TextField, Theme, Typography, useTheme} from "@mui/material";
import {zodResolver} from '@hookform/resolvers/zod';
import {registerResolver, registerType} from "../resolver";

const CustomerRegisterForm = (): React.JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<registerType>({resolver: zodResolver(registerResolver)});
    const theme: Theme = useTheme();

    const onSubmit = (): void => {

    }

    return (
        <form style={{width: "100%", padding: "1rem"}} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{p: 4, minHeight: "550px"}} display="flex" flexDirection="column" justifyContent="center"
                 alignItems="center" height="100%">
                <FormControl sx={{mb: 2}} fullWidth>
                    <Typography variant="h3">create your account</Typography>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="first and last name"
                               variant="outlined"
                               color="primary"
                               {...register("name")}
                               error={!!errors.name}
                               helperText={errors.name ? errors.name.message : ""}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Person/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="email"
                               variant="outlined"
                               color="primary"
                               {...register("email")}
                               error={!!errors.email}
                               helperText={errors.email ? errors.email.message : ""}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Email/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="password"
                               variant="outlined"
                               color="primary"
                               {...register("password")}
                               error={!!errors.password}
                               helperText={errors.password ? errors.password.message : ""}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Key/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </FormControl>
                <FormControl sx={{mb: 2}} fullWidth>
                    <TextField label="repeat password"
                               variant="outlined"
                               color="primary"
                               {...register("repeatPassword")}
                               error={!!errors.repeatPassword}
                               helperText={errors.repeatPassword ? errors.repeatPassword.message : ""}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Repeat/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </FormControl>
                {!!errors[""] &&
                    <FormControl fullWidth sx={{mb: 1}}>
                        <Typography color="error" variant="body1">{errors[""].message}</Typography>
                    </FormControl>
                }
                <FormControl sx={{mb: 2}} fullWidth>
                    <Typography>you have account? click <Link to="/login" style={{color: theme.palette.primary.main}}>here</Link> to login</Typography>
                </FormControl>
                <FormControl fullWidth>
                    <Button sx={{p: 2}} type="submit" variant="contained">register</Button>
                </FormControl>
            </Box>
        </form>
    );
}

export default CustomerRegisterForm;
