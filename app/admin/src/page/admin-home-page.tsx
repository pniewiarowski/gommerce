import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { JwtContext, UserContext } from "../context";
import { PageContainerGrid, PaperButton } from "../atoms";
import { ResourceInfoDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { useTheme } from "@emotion/react";

class Service {
    constructor(
        public readonly label: string,
        public readonly link: string,
        public readonly icon: JSX.Element,
    ) { }
}

const AdminHomePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [categoriesInfo, setCategoriesInfo] = useState<ResourceInfoDefinition>();
    const [productsInfo, setProductsInfo] = useState<ResourceInfoDefinition>();
    const [customersInfo, setCustomersInfo] = useState<ResourceInfoDefinition>();
    const { categoriesRepository, productRepository, customersRepository } = useBackend();
    const iconSize = 78;
    const services = [
        new Service("Shop", "/shop", <img src="shopping-cart.png" width={iconSize} />),
    ];

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setCategoriesInfo(await categoriesRepository.getResourceInfo(jwt));
            setProductsInfo(await productRepository.getResourceInfo(jwt));
            setCustomersInfo(await customersRepository.getResourceInfo(jwt));

            setLoading(false);
        }

        fetch();
    }, []);

    if (loading) {
        return <Fragment></Fragment>
    }

    return (
        <PageContainerGrid>
            <Typography sx={{ fontSize: 40, }} variant="h2">general</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="primary">Home</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Typography sx={{ fontSize: 20, fontWeight: "bold", mb: 1, mt: 2 }} variant="h2">your resources in numbers</Typography>
            <Paper elevation={4} sx={{ p: 4, mb: 2 }}>
                <BarChart
                    yAxis={[{ scaleType: 'band', data: ['Categories', 'Products', 'Customers'] }]}
                    series={[{ data: [categoriesInfo.size, productsInfo.size, customersInfo.size], label: "Entites" }]}
                    colors={[theme.palette.primary.main]}
                    height={300}
                    layout="horizontal"
                />
            </Paper>

            <Typography sx={{ fontSize: 20, fontWeight: "bold", mb: 1 }} variant="h2">manage your services</Typography>
            <Grid container spacing={1}>
                {services.map((service) => {
                    return (
                        <Grid xl={2} item>
                            <Button sx={{ width: "100%", height: "200px", p: 0 }} onClick={() => navigate(service.link)}>
                                <PaperButton>
                                    {service.icon}
                                    <Typography variant="h3">{service.label}</Typography>
                                </PaperButton>
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        </PageContainerGrid >
    )
}

export default AdminHomePage;