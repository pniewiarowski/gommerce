import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, FormControl, Typography } from "@mui/material";
import { ArrowBack, ShoppingBag } from "@mui/icons-material";
import { useBackend, useCookies } from "gommerce-app-shared/hook";
import { CustomerContext, JwtContext, ShopBagContext } from "../context";
import { ProductDefinition } from "gommerce-app-shared/api/definition";

const SummaryOrderForm = () => {
    const [address, setAddress] = useState<string>("");
    const [qty, setQty] = useState<number | null>(null);
    const { get } = useCookies();
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { customer } = useContext(CustomerContext);
    const { jwt } = useContext(JwtContext);
    const { ordersRepository } = useBackend();
    const navigate = useNavigate();

    useEffect(() => {
        const street: string = get("address-form-street-name");
        const number: string = get("address-form-number");
        const city: string = get("address-form-city");

        setQty(shopBag.length);
        setAddress(`${street} ${number}, ${city}`);
    }, []);

    const handleBuy = () => {
        const buy = async () => {
            let price = 0;
            shopBag.forEach((product: ProductDefinition) => {
                price += product.price;
            });

            ordersRepository.create({
                customerID: customer.id,
                fullPrice: price,
            }, jwt);
        }

        buy();
        setShopBag([]);
        navigate("/checkout/success");
    }

    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
        }}>
            <Box>
                <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                    <Typography variant="h3">summary</Typography>
                </FormControl>
                <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                    <Typography variant="body1">delivery to {address}</Typography>
                </FormControl>
            </Box>
            <div>
                <Link to="/checkout/payment-method">
                    <Button color="error" variant="outlined" startIcon={<ArrowBack />} sx={{ p: 2, mr: 2, width: "48.7%" }}>
                        back
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<ShoppingBag />}
                    sx={{ p: 2, width: "48.7%" }}
                    onClick={handleBuy}
                >
                    buy
                </Button>
            </div>
        </Container>
    )
}

export default SummaryOrderForm;
