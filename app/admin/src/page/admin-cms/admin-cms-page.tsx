import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { Grid, Paper, Breadcrumbs, Typography, Button, Grow } from "@mui/material";
import { PageContainerGrid, PaperButton } from "../../atoms";

class ShopResource {
    constructor(
        public readonly label: string,
        public readonly link: string,
        public readonly icon: JSX.Element,
    ) { }
}

const AdminCMSPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const iconSize = 50;
    const resources = [
        new ShopResource("Themes", "/cms/theme", <img src="brush.png" width={iconSize} />),
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
                            <Typography color="primary">CMS</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
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
        </PageContainerGrid>
    );
}

export default AdminCMSPage;
