import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Grow } from "@mui/material";
import { UserContext } from "../../context";
import { PageContainerGrid } from "../../atoms";
import { AdminBreadcrumbs, SettingForm } from "../../organism";

const AdminSettingsPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[{ label: "Home", link: "/" }, { label: "Settings", link: "/settings" }]} />
            <Grid item xs={12}>
                <SettingForm />
            </Grid>
            <Grow in={true} {...{ timeout: 750 }}>
                <Button sx={{ p: 1, width: 100, mr: 2 }} color="error" variant="outlined" onClick={() => navigate('/')}>
                    back
                </Button>
            </Grow>
        </PageContainerGrid>
    );
}

export default AdminSettingsPage;
