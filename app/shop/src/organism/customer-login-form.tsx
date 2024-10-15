import React, { useContext } from "react";
import { Box, Button, FormControl, InputAdornment, TextField, Theme, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Email, Key } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { loginResolver, loginType } from "../resolver";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerContext, JwtContext, UserContext } from "../context";
import { useBackend, useCookies } from "gommerce-app-shared/hook";

const CustomerLoginForm = () => {
    const theme: Theme = useTheme();
    const navigate = useNavigate();
    const { authRepository, usersRepository } = useBackend();
    const { set } = useCookies();
    const { setUser } = useContext(UserContext);
    const { setCustomer } = useContext(CustomerContext);
    const { setJwt } = useContext(JwtContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginType>({ resolver: zodResolver(loginResolver) });

    const onSubmit = async (data: loginType) => {
        const login = async () => {
            try {
                const jwt = await authRepository.jwt({
                    email: data.email,
                    password: data.password
                });

                if (!jwt) {
                    navigate(`/login?errorLogin=something went wrong please train again later`);
                    return;
                }

                const user = await usersRepository.getByID(jwt.userID, jwt.token);

                if (!user || !user.id) {
                    navigate(`/login?errorLogin=something went wrong please train again later`);
                    return;
                }

                set("jwt", jwt.token);
                setJwt(jwt.token);
                set("userID", user.id);
                set("userEmail", user.email);
                setUser(user);
            } catch (exception: any) {
                const message = JSON.parse(exception.request.response).message;
                navigate(`/login?errorLogin=${message}`);

                return false;
            }

            return true;
        }

        if (await login()) {
            navigate("/");
        }
    }

    return (
        <form style={{ width: "100%", padding: "1rem" }} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ p: 4, minHeight: "618px" }} display="flex" flexDirection="column" justifyContent="center"
                alignItems="center" height="100%">
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <Typography variant="h3">you are logout</Typography>
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField label="email"
                        variant="outlined"
                        color="primary"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }} />
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField label="password"
                        variant="outlined"
                        color="primary"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            ),
                        }} />
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <Typography>not have account yet? click <Link to="/register"
                        style={{ color: theme.palette.primary.main }}>here</Link> to
                        register</Typography>
                </FormControl>
                <FormControl fullWidth>
                    <Button sx={{ p: 2 }} variant="contained" style={{ textAlign: 'left' }} type="submit">login</Button>
                </FormControl>
            </Box>
        </form>
    );
}

export default CustomerLoginForm;
