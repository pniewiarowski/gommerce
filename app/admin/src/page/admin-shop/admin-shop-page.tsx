import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { UserContext } from "../../context";
import { PageContainerGrid, PaperButton } from "../../atoms";

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
    const iconSize = 78;
    const resources = [
        new ShopResource("Categories", "/shop/category", <img src="inventory-category.png" width={iconSize} />),
        new ShopResource("Products", "/shop/product", <img src="shopping-cart.png" width={iconSize} />),
        new ShopResource("Customers", "/shop/customer", <img src="customers.png" width={iconSize} />),
        new ShopResource("Orders", "/shop/order", <img src="money-bag.png" width={iconSize} />),
    ];

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <Typography sx={{ fontSize: 40, }} variant="h2">shop service</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="primary">Shop</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid container spacing={1}>
                {resources.map((resource) => {
                    return (
                        <Grid xl={2} item>
                            <Button sx={{ width: "100%", height: "200px", p: 0 }} onClick={() => navigate(resource.link)}>
                                <PaperButton>
                                    {resource.icon}
                                    <Typography variant="h3">{resource.label}</Typography>
                                </PaperButton>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
            <Grid sx={{ mt: 1.5 }} item xs={12}>
                <Button
                    sx={{ p: 2, width: 200, mr: 2 }}
                    color="error"
                    variant="outlined"
                    onClick={() => navigate('/')}
                >
                    go back
                </Button>
            </Grid>
        </PageContainerGrid>
    )
}

export default AdminShopPage;