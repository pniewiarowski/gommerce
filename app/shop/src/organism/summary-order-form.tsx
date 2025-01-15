import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, FormControl, Typography } from "@mui/material";
import { ArrowBack, ShoppingBag } from "@mui/icons-material";
import { useBackend, useCookies } from "gommerce-app-shared/hook";
import { CustomerContext, JwtContext, ShopBagContext } from "../context";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { MakeOrderDialog } from "./dialog";
import { ProductList } from "./list";

const SummaryOrderForm = () => {
    const [address, setAddress] = useState<string>("");
    const [isMakeOrderDialogOpen, setIsMakeOrderDialogOpen] = useState<boolean>(false);
    const { customer } = useContext(CustomerContext);
    const { get, set } = useCookies();
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const [fullPrice, setFullPrice] = useState<number>(0);
    const { jwt } = useContext(JwtContext);

    const { ordersRepository, addressesRepository } = useBackend();
    const navigate = useNavigate();

    useEffect(() => {
        const street: string = get("address-form-street-name");
        const number: string = get("address-form-number");
        const city: string = get("address-form-city");

        let price = 0;
        shopBag.forEach((product: ProductDefinition) => {
            price += product.price;
        });

        setFullPrice(price);
        setAddress(`${street} ${number}, ${city}`);
    }, []);

    const handleBuy = () => {
        const buy = async () => {
            const productIDs: Array<number> = [];
            let price = 0;
            shopBag.forEach((product: ProductDefinition) => {
                product.id !== null && productIDs.push(product.id);
            });

            setFullPrice(price);
            ordersRepository.create({
                productsIDs: productIDs,
                products: null,
            }, jwt);

            addressesRepository.create({
                city: get("address-form-city"),
                country: "",
                street: get("address-form-street-name"),
                streetNumber: Number(get("address-form-number")),
                apartmentNumber: 0,
                state: "",
                customerID: Number(customer.id),
            }, jwt);
        }

        setShopBag([]);
        set("gommerce-shop-bag", JSON.stringify([]));
        buy();
        navigate("/checkout/success");
    }

    const handleOpenMakeOrderDialog = () => {
        setIsMakeOrderDialogOpen(true);
    }

    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
        }}>
            <MakeOrderDialog open={isMakeOrderDialogOpen} setActive={setIsMakeOrderDialogOpen} make={handleBuy} />
            <Box>
                <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                    <Typography variant="h3">summary</Typography>
                </FormControl>
                <FormControl sx={{ mb: 2, mt: 2, display: "flex" }} fullWidth>
                    <Typography variant="body1">delivery to {address}</Typography>
                </FormControl>
                <ProductList products={shopBag} />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography>Full price: <b>{fullPrice}</b>$</Typography>
                </Box>
            </Box>
            <div>
                <Link to="/checkout/payment-method">
                    <Button color="error" variant="outlined" startIcon={<ArrowBack />} sx={{ p: 2, mr: 2, width: "48.5%" }}>
                        back
                    </Button>
                </Link>
                <Button variant="contained" color="success" startIcon={<ShoppingBag />} sx={{ p: 2, width: "48.5%" }} onClick={handleOpenMakeOrderDialog}>
                    buy
                </Button>
            </div>
        </Container>
    )
}

export default SummaryOrderForm;
