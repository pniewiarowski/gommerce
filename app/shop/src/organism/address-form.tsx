import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";

const AddressForm = () => {
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
        }}>
            <div>
                <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                    <Typography variant="h3">fill your address</Typography>
                </FormControl>
                <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }} fullWidth>
                    <TextField
                        sx={{ width: "70%" }}
                        label="street name"
                        variant="outlined"
                        required
                    />
                    <TextField
                        sx={{ ml: 2, width: "30%" }}
                        label="number"
                        variant="outlined"
                        required
                    />
                </FormControl>
                <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                    <TextField
                        sx={{ width: "30%" }}
                        label="postal code"
                        variant="outlined"
                        required
                    />
                    <TextField
                        sx={{ ml: 2, width: "70%" }}
                        label="city"
                        variant="outlined"
                        required
                    />
                </FormControl>
                <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                    <TextField
                        sx={{ width: "50%" }}
                        label="state"
                        variant="outlined"
                        required
                    />
                    <TextField
                        sx={{ ml: 2, width: "50%" }}
                        label="country"
                        variant="outlined"
                        required
                    />
                </FormControl>
                <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
                    <TextField label="extra comment for delivery" rows={8} multiline fullWidth />
                </FormControl>
            </div>
            <div>
                <Link to="/checkout/payment-method">
                    <Button endIcon={<ArrowForward />} fullWidth sx={{ p: 2 }}>
                        go next
                    </Button>
                </Link>
            </div>
        </Container >
    )
}

export default AddressForm;
