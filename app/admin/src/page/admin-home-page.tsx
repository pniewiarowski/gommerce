import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Grow, Paper, Typography } from "@mui/material";
import { UserContext } from "../context";
import { PageContainerGrid, PaperButton, PageTitle } from "../atoms";
import { LineChart } from "@mui/x-charts";

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
        new Service("Shop", "/shop", <img src="/shopping-cart.png" width={iconSize} />),
        new Service("CMS", "/cms", <img src="/brush.png" width={iconSize} />),
        new Service("Settings", "/settings", <img src="/settings.png" width={iconSize} />),
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
                            <Typography variant="h3">orders</Typography>
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
                    {services.map((service, index: number) => {
                        return (
                            <Grow in={true} {...{ timeout: 500 + (index * 250) }}>
                                <Button sx={{ width: "120px", height: "100px", p: 0, mr: 1 }} onClick={() => navigate(service.link)}>
                                    <PaperButton>
                                        {service.icon}
                                        <Typography variant="h4">{service.label}</Typography>
                                    </PaperButton>
                                </Button>
                            </Grow>
                        );
                    })}
                </Grid>
            </Grid>
        </PageContainerGrid >
    )
}

export default AdminHomePage;