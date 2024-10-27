import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainerGrid } from "../../../atoms";
import { UserContext } from "../../../context";
import { AdminBreadcrumbs } from "../../../organism";

const AdmiShopOrderShowPage = () => {
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
                { label: "Shop", link: "/shop" },
                { label: "Order", link: "/shop/order" },
                { label: "Show", link: "/shop/order/1" },
            ]} />
        </PageContainerGrid>
    )
}

export default AdmiShopOrderShowPage;
