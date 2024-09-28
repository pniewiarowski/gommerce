import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, FormControl, Typography } from "@mui/material";
import { ArrowBack, ShoppingBag } from "@mui/icons-material";
import { useBackend } from "gommerce-app-shared/hook";
import { CustomerContext, JwtContext, ShopBagContext } from "../context";
import { ProductDefinition } from "gommerce-app-shared/api/definition";

const SummaryOrderForm = () => {
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { customer } = useContext(CustomerContext);
    const { jwt } = useContext(JwtContext);
    const { ordersRepository } = useBackend();
    const navigate = useNavigate();

    const handleBuy = () => {
        const buy = async () => {
            let price = 0;
            shopBag.forEach((product: ProductDefinition) => {
                price += product.price;
            });

            ordersRepository.create({
                customerId: customer.id,
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
            <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                <Typography variant="h3">summary</Typography>
            </FormControl>
            <div>
                <Link to="/checkout/payment-method">
                    <Button startIcon={<ArrowBack />} sx={{ p: 2, mr: "10%", width: "45%" }}>
                        go back
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<ShoppingBag />}
                    sx={{ p: 2, width: "45%" }}
                    onClick={handleBuy}
                >
                    buy
                </Button>
            </div>
        </Container>
    )
}

export default SummaryOrderForm;
