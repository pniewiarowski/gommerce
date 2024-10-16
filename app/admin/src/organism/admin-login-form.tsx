import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Container,
    FormControl,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Email, Key } from "@mui/icons-material";
import { useBackend, useCookies } from "gommerce-app-shared/hook";
import { loginResolver, loginType } from "../resolver";
import { UserContext, JwtContext } from "../context";

const AdminLoginForm = () => {
    const navigate = useNavigate();
    const { authRepository, usersRepository } = useBackend();
    const { set } = useCookies();
    const { setUser } = useContext(UserContext);
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

                if (!jwt.isAdmin) {
                    navigate(`/login?errorLogin=user is not administrator`);
                    return;
                }

                const user = await usersRepository.getByID(jwt.userID, jwt.token);

                if (!user || !user.id) {
                    navigate(`/login?errorLogin="something went wrong please train again later`);
                    return;
                }


                set("jwt", jwt.token);
                setJwt(jwt.token);
                set("userID", user.id);
                set("userEmail", user.email);
                setUser(user);
            } catch (exception: any) {
                const message = exception.response.data.message;
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
            <Container>
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
                    <FormControl sx={{ mb: 2, mt: 2 }} fullWidth>
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
                    <FormControl fullWidth>
                        <Button sx={{ p: 2, mt: 2 }} variant="contained" type="submit">login</Button>
                    </FormControl>
                </FormControl>
            </Container>
        </form>
    );
}

export default AdminLoginForm;
