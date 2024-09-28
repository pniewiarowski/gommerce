import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useBackend } from "gommerce-app-shared/hook";
import { ResourceInfoDefinition } from "gommerce-app-shared/api/definition";
import { useTheme } from "@emotion/react";
import { JwtContext, UserContext } from "../context";
import { PageContainerGrid, PaperButton } from "../atoms";
import { SubHeading } from "../molecules";

class Service {
    constructor(
        public readonly label: string,
        public readonly link: string,
        public readonly icon: JSX.Element,
    ) { }
}

const AdminHomePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const iconSize = 78;
    const services = [
        new Service("Shop", "/shop", <img src="shopping-cart.png" width={iconSize} />),
    ];

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

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
            <SubHeading>manage your services</SubHeading>
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