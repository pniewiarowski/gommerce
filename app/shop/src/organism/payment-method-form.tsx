import { Link, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward, Wallet } from "@mui/icons-material";
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const PaymentMethodForm = () => {
    const navigate = useNavigate();

    const submit = () => {
        navigate('/checkout/summary');
    };

    return (
        <Container sx={{ height: "100%" }}>
            <form style={{ height: "100%" }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                }}>
                    <Box>
                        <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                            <Typography variant="h3">select payment method</Typography>
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="payment-method-label"
                                defaultValue="cash-on-delivery"
                                name="payment-method"
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Wallet sx={{ mr: 2 }} />
                                    <FormControlLabel value="cash-on-delivery" control={<Radio />} label="cash on delivery" />
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <Link to="/checkout/address">
                            <Button color="error" variant="outlined" startIcon={<ArrowBack />} sx={{ p: 2, mr: 2, width: "48.5%" }}>
                                back
                            </Button>
                        </Link>
                        <Button onClick={submit} variant="contained" endIcon={<ArrowForward />} sx={{ p: 2, width: "48.5%" }}>
                            next
                        </Button>
                    </Box>
                </Box>
            </form>
        </Container >
    )
}

export default PaymentMethodForm;
