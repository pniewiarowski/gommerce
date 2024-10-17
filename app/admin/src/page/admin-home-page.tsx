import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { UserContext } from "../context";
import { PageContainerGrid, PaperButton, PageTitle } from "../atoms";

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
    const iconSize = 50;
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
            <Grid item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="primary">Home</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid container spacing={1}>
                <Grid xl={12} item>
                    {services.map((service) => {
                        return (
                            <>
                                <Button sx={{ width: "120px", height: "100px", p: 0, mr: 1 }} onClick={() => navigate(service.link)}>
                                    <PaperButton>
                                        {service.icon}
                                        <Typography variant="h4">{service.label}</Typography>
                                    </PaperButton>
                                </Button>
                            </>
                        );
                    })}
                </Grid>
            </Grid>
        </PageContainerGrid >
    )
}

export default AdminHomePage;