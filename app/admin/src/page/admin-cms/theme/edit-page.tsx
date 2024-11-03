import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { UserContext } from "../../../context";
import { AdminBreadcrumbs, ThemeForm } from "../../../organism";
import { PageContainerGrid } from "../../../atoms";
import { ThemeDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";

const AdminCMSThemeEditPage = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState<ThemeDefinition | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const { themeRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            setTheme(await themeRepository.getByID(Number(id)))
            setLoading(false);
        })()
    }, []);

    if (loading) {
        return;
    }

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "CMS", link: "/cms" },
                { label: "Theme", link: "/cms/theme" },
                { label: "Edit", link: `/cms/theme/edit/${id}` },
            ]} />
            <Grid item xs={12}>
                <ThemeForm default={theme} />
            </Grid>
        </PageContainerGrid>
    )
}

export default AdminCMSThemeEditPage;
