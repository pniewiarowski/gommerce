import { Link } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const PaymentMethodForm = () => {
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
                                <FormControlLabel value="cash-on-delivery" control={<Radio />} label="cash on delivery" />
                                <FormControlLabel value="card-payment" control={<Radio />} label="card payment" />
                                <FormControlLabel value="blik" control={<Radio />} label={
                                    <img src="/blik.png" alt="blik" width="50px" />
                                } />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <Link to="/checkout/address">
                            <Button color="error" startIcon={<ArrowBack />} sx={{ p: 2, mr: "10%", width: "45%" }}>
                                go back
                            </Button>
                        </Link>
                        <Link to="/checkout/summary">
                            <Button variant="contained" endIcon={<ArrowForward />} sx={{ p: 2, width: "45%" }}>
                                go next
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </form>
        </Container >
    )
}

export default PaymentMethodForm;
