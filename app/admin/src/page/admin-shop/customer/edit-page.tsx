import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context";
import { Typography, Divider } from "@mui/material";
import { PageContainerGrid } from "../../../atoms";

const AdminShopCustomerEditPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <Typography sx={{ fontSize: 40, }} variant="h2">edit customer</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
        </PageContainerGrid>
    );
}

export default AdminShopCustomerEditPage;
