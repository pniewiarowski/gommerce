import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";
import { AdminBreadcrumbs } from "../../../organism";

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
        </PageContainerGrid>
    )
}

export default AdminCMSThemeCreatePage;
