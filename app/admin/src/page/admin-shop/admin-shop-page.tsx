import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Grid, Grow, Paper, Typography } from "@mui/material";
import { UserContext } from "../../context";
import { PageContainerGrid, PaperButton } from "../../atoms";
import { AdminBreadcrumbs } from "../../organism";
import { LineChart } from "@mui/x-charts";

class ShopResource {
    constructor(
        public readonly label: string,
        public readonly link: string,
        public readonly icon: JSX.Element,
    ) { }
}

const AdminShopPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const iconSize = 50;
    const resources = [
        new ShopResource("Categories", "/shop/category", <img src="/inventory-category.png" width={iconSize} />),
        new ShopResource("Products", "/shop/product", <img src="/shopping-cart.png" width={iconSize} />),
        new ShopResource("Customers", "/shop/customer", <img src="/customers.png" width={iconSize} />),
        new ShopResource("Addresses", "/shop/address", <img src="/company.png" width={iconSize} />),
        new ShopResource("Orders", "/shop/order", <img src="/money-bag.png" width={iconSize} />),
    ];

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[{ label: "Home", link: "/" }, { label: "Shop", link: "/shop" }]} />
            <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid xl={6} item>
                    <Grow in={true} {...{ timeout: 250 }}>
                        <Paper elevation={4} sx={{ p: 2 }}>
                            <Typography variant="h3">registered customers</Typography>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                                series={[
                                    { data: [3, 1, 2, 5, 5, 1], },
                                ]}
                                width={780}
                                height={300}
                                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                                grid={{ vertical: true, horizontal: true }}
                            />
                        </Paper>
                    </Grow>
                </Grid>
                <Grid xl={6} item>
                    <Grow in={true} {...{ timeout: 500 }}>
                        <Paper elevation={4} sx={{ p: 2 }}>
                            <Typography variant="h3">created orders</Typography>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                                series={[
                                    { data: [0, 1, 2, 3, 0, 1], },
                                ]}
                                width={780}
                                height={300}
                                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                                grid={{ vertical: true, horizontal: true }}
                            />
                        </Paper>
                    </Grow>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid xl={12} item>
                    {resources.map((resource, index: number) => {
                        return (
                            <Grow in={true} {...{ timeout: 250 + (index * 250) }}>
                                <Button sx={{ width: "120px", height: "100px", p: 0, mr: 1 }} onClick={() => navigate(resource.link)}>
                                    <PaperButton>
                                        {resource.icon}
                                        <Typography variant="h4">{resource.label}</Typography>
                                    </PaperButton>
                                </Button>
                            </Grow>
                        );
                    })}
                </Grid>
            </Grid>
            <Grid sx={{ mt: 1.5 }} item xs={12}>
                <Grow in={true} {...{ timeout: 750 }}>
                    <Button sx={{ p: 1, width: 100, mr: 2 }} color="error" variant="outlined" onClick={() => navigate('/')}>
                        back
                    </Button>
                </Grow>
            </Grid>
        </PageContainerGrid >
    )
}

export default AdminShopPage;