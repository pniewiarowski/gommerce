import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { UserContext } from "../../../context";
import { AdminBreadcrumbs, ThemeForm } from "../../../organism";
import { PageContainerGrid } from "../../../atoms";

const AdminCMSThemeCreatePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "CMS", link: "/cms" },
                { label: "Theme", link: "/cms/theme" },
                { label: "Create", link: "/cms/theme/create" },
            ]} />
            <Grid item xs={12}>
                <ThemeForm />
            </Grid>
        </PageContainerGrid>
    )
}

export default AdminCMSThemeCreatePage;
