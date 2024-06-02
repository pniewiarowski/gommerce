import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { UserContext } from "../context";
import { PageContainerGrid } from "../atoms";

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
            <Typography sx={{ fontSize: 40, }} variant="h2">settings</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
        </PageContainerGrid>
    )
}

export default AdminSettingsPage;
