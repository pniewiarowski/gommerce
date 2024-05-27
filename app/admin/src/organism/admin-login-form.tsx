import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, FormControl, InputAdornment, TextField } from "@mui/material";
import { Email, Key } from "@mui/icons-material";
import { loginResolver, loginType } from "../resolver";

const AdminLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginType>({ resolver: zodResolver(loginResolver)});

    const onSubmit = async (data: loginType) => {

    }

    return (
        <form style={{ width: "100%", padding: "1rem" }} onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <FormControl sx={{ mb: 2, mt: 2 }} fullWidth>
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
                        <Button sx={{ p: 2, mt: 2 }} variant="contained" style={{ textAlign: 'left' }} type="submit">login</Button>
                    </FormControl>
                </FormControl>
            </Container>
        </form>
    );
}

export default AdminLoginForm;
