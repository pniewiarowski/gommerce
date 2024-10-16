import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, } from "@mui/material";
import { UserContext } from "../context";
import { PageContainerGrid, PageTitle } from "../atoms";

const AdminMailingPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return (
        <PageContainerGrid>
            <PageTitle title="mailing service" />
            <Divider sx={{ mt: 2, mb: 1 }} />
        </PageContainerGrid >
    )
}

export default AdminMailingPage;
