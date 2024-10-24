import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    TextField,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import { Person, Key, Repeat, Email, PersonOutline } from "@mui/icons-material";
import { zodResolver } from '@hookform/resolvers/zod';
import { useBackend } from "gommerce-app-shared/hook";
import { registerResolver, registerType } from "../resolver";

const CustomerRegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<registerType>({ resolver: zodResolver(registerResolver) });
    const theme: Theme = useTheme();
    const navigate = useNavigate();
    const { authRepository, customersRepository } = useBackend();

    const onSubmit = async (data: registerType) => {
        const register = async () => {
            try {
                const register = await authRepository.register({
                    email: data.email,
                    password: data.password,
                });

                await customersRepository.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    isActive: true,
                }, register.token);
            } catch (exception: any) {
                const message = JSON.parse(exception.request.response).message;
                navigate(`/register?error=${message}`);
                return false;
            }

            return true;
        }

        if (await register()) {
            navigate("/login?successRegister=true");
            return;
        }
    }

    return (
        <form style={{ width: "100%", padding: "1rem" }} onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{ p: 2, minHeight: "618px" }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <Typography variant="h3">create your account</Typography>
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <div style={{ display: "flex" }}>
                        <TextField
                            sx={{ width: "50%", mr: 1 }}
                            label="first name"
                            variant="outlined"
                            color="primary"
                            {...register("firstName")}
                            error={!!errors.firstName}
                            helperText={errors.firstName ? errors.firstName.message : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            sx={{ width: "50%" }}
                            label="last name"
                            variant="outlined"
                            color="primary"
                            {...register("lastName")}
                            error={!!errors.lastName}
                            helperText={errors.lastName ? errors.lastName.message : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
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
                    <TextField label="repeat password"
                        variant="outlined"
                        color="primary"
                        type="password"
                        {...register("repeatPassword")}
                        error={!!errors.repeatPassword}
                        helperText={errors.repeatPassword ? errors.repeatPassword.message : ""}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Repeat />
                                </InputAdornment>
                            ),
                        }} />
                </FormControl>
                {!!errors[""] &&
                    <FormControl fullWidth sx={{ mb: 1 }}>
                        <Typography color="error" variant="body1">{errors[""].message}</Typography>
                    </FormControl>
                }
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <Typography>you have account? click <Link to="/login"
                        style={{ color: theme.palette.secondary.main }}>here</Link> to
                        login</Typography>
                </FormControl>
                <FormControl fullWidth>
                    <Button sx={{ p: 2 }} type="submit" variant="contained">register</Button>
                </FormControl>
            </Box>
        </form>
    );
}

export default CustomerRegisterForm;
