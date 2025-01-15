import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, Grow, Paper, Typography } from "@mui/material";
import { PageContainerGrid } from "../../../atoms";
import { JwtContext, UserContext } from "../../../context";
import { AdminBreadcrumbs, CustomerBox, ProductList } from "../../../organism";
import { useBackend } from "gommerce-app-shared/hook";
import { AddressDefinition, CustomerDefinition, OrderDefinition } from "gommerce-app-shared/api/definition";
import { ResourceFormViewAction } from "../../../organism/resource";

const AdmiShopOrderShowPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);

    const [order, setOrder] = useState<OrderDefinition | null>(null);
    const [customer, setCustomer] = useState<CustomerDefinition | null>(null);
    const [address, setAddress] = useState<AddressDefinition | null>(null);

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { ordersRepository, customersRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            setOrder(await ordersRepository.getByID(Number(id), jwt))
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (order) {
                setCustomer(await customersRepository.getByID(order.customerID as number, jwt));
                setLoading(false);
            }
        })();
    }, [order])

    useEffect(() => {
        (async () => {
            if (customer) {
                setAddress(await customersRepository.getAddress(customer.id as number, jwt));
            }
        })();
    }, [customer])

    if (loading) {
        return;
    }

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Order", link: "/shop/order" },
                { label: "Show", link: `/shop/order/show/${id}` },
            ]} />
            <Grow in={true} {...{ timeout: 250 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>Customer data</Typography>
                    {customer && <CustomerBox customer={customer} />}
                </Paper>
            </Grow>
            <Grow in={true} {...{ timeout: 500 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                    <Typography variant="h3">Ordered products</Typography>
                    <ProductList products={order?.products ?? []} />
                </Paper>
            </Grow>
            <Grow in={true} {...{ timeout: 750 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                    <Typography variant="h3">Address</Typography>
                    <Typography variant="body1">{address?.city} {address?.street} {address?.streetNumber}</Typography>
                </Paper>
            </Grow>
            <Grow in={true} {...{ timeout: 1000 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                    <Typography variant="h3">Order status</Typography>
                    <Chip color="primary" label={order.status.length === 0 ? "undefined" : order.status} />
                </Paper>
            </Grow>
            <Grow in={true} {...{ timeout: 1250 }}>
                <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                    <Typography variant="h3">Order summary</Typography>
                </Paper>
            </Grow>
            <ResourceFormViewAction backLink={"/shop/order"} type={"show"} />
        </PageContainerGrid>
    )
}

export default AdmiShopOrderShowPage;
