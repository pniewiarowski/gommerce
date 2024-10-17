import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { UserContext } from "../../context";
import { PageContainerGrid, PaperButton } from "../../atoms";
import PageTitle from "../../atoms/page-title";

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
            <Grid item xs={12}>
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
                <Grid xl={12} item>
                    {resources.map((resource) => {
                        return (
                            <Button sx={{ width: "120px", height: "100px", p: 0, mr: 1 }} onClick={() => navigate(resource.link)}>
                                <PaperButton>
                                    {resource.icon}
                                    <Typography variant="h4">{resource.label}</Typography>
                                </PaperButton>
                            </Button>
                        );
                    })}
                </Grid>
            </Grid>
            <Grid sx={{ mt: 1.5 }} item xs={12}>
                <Button
                    sx={{ p: 1, width: 100, mr: 2 }}
                    color="error"
                    variant="outlined"
                    onClick={() => navigate('/')}
                >
                    back
                </Button>
            </Grid>
        </PageContainerGrid>
    )
}

export default AdminShopPage;