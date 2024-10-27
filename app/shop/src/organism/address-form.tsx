
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Apartment, Numbers, Close, LocationCity } from "@mui/icons-material";
import { Box, Button, Container, FormControl, InputAdornment, TextField, Typography } from "@mui/material";
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from "gommerce-app-shared/hook";
import { addresResolver, addressType } from "../resolver";
import { useEffect } from "react";

interface Props {
    scope: "checkout" | "update-form",
}

const AddressForm = (props: Props) => {
    const navigate = useNavigate();
    const { set, get } = useCookies();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<addressType>({ resolver: zodResolver(addresResolver) });

    useEffect(() => {
        setValue("streetName", get("address-form-street-name"));
        setValue("number", get("address-form-number"));
        setValue("postalCode", get("address-form-postal-code"));
        setValue("city", get("address-form-city"));
        setValue("state", get("address-form-state"));
        setValue("country", get("address-form-country"));
        setValue("extraComment", get("address-form-extra-comment"));
    }, []);

    const onSubmit = async (data: addressType) => {
        switch (props.scope) {
            case "checkout":
                set("address-form-filled", true);
                set("address-form-street-name", data.streetName);
                set("address-form-number", data.number);
                set("address-form-postal-code", data.postalCode);
                set("address-form-city", data.city);
                set("address-form-state", data.state);
                set("address-form-country", data.country);
                set("address-form-extra-comment", data.extraComment);

                navigate('/checkout/payment-method');
                break;
            case "update-form":
                break;
        }
    };

    const onCancle = (event: Event) => {
        event.preventDefault();
        navigate('/checkout')
    };

    return (
        <Container sx={{ height: "90%" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                }}>
                    <Box>
                        <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }} fullWidth>
                            <TextField
                                sx={{ width: "70%" }}
                                label="street name"
                                variant="outlined"
                                {...register("streetName")}
                                error={!!errors.streetName}
                                helperText={errors.streetName ? errors.streetName.message : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Apartment />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                type="number"
                                sx={{ ml: 2, width: "30%" }}
                                label="number"
                                variant="outlined"
                                {...register("number")}
                                error={!!errors.number}
                                helperText={errors.number ? errors.number.message : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Numbers />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                            <TextField
                                sx={{ width: "30%" }}
                                label="postal code"
                                variant="outlined"
                                {...register("postalCode")}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode ? errors.postalCode.message : ""}
                            />
                            <TextField
                                sx={{ ml: 2, width: "70%" }}
                                label="city"
                                variant="outlined"
                                {...register("city")}
                                error={!!errors.city}
                                helperText={errors.city ? errors.city.message : ""}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCity />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                            <TextField
                                sx={{ width: "50%" }}
                                label="state"
                                variant="outlined"
                                {...register("state")}
                                error={!!errors.state}
                                helperText={errors.state ? errors.state.message : ""}
                            />
                            <TextField
                                sx={{ ml: 2, width: "50%" }}
                                label="country"
                                variant="outlined"
                                {...register("country")}
                                error={!!errors.country}
                                helperText={errors.country ? errors.country.message : ""}
                            />
                        </FormControl>
                        <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                            <TextField label="extra comment for delivery" rows={10} multiline fullWidth {...register("extraComment")} />
                        </FormControl>
                    </Box>

                    {props.scope === "checkout" && <Box>
                        <Button onClick={onCancle} color="error" variant="outlined" type="submit" startIcon={<Close />} fullWidth sx={{ p: 2, mr: 2, width: "48.7%" }}>
                            cancel
                        </Button>
                        <Button type="submit" variant="contained" endIcon={<ArrowForward />} fullWidth sx={{ p: 2, width: "48.7%" }}>
                            next
                        </Button>
                    </Box>}

                    {props.scope === "update-form" && <Box>
                        <Button variant="outlined" color="error" sx={{ mr: 1 }}>
                            clear
                        </Button>
                        <Button type="submit" variant="contained">
                            save
                        </Button>
                    </Box>}
                </Box>
            </form>
        </Container >
    )
}

export default AddressForm;
