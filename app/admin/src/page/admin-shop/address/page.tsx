import { useContext, useEffect } from "react";
import { UserContext, JwtContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { PageContainerGrid } from "../../../atoms";
import { AdminBreadcrumbs } from "../../../organism";

const AdminShopAddressPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Customer", link: "/shop/address" },
            ]} />
        </PageContainerGrid>
    )
}

export default AdminShopAddressPage;
