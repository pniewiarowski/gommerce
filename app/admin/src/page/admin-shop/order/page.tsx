import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBackend } from "gommerce-app-shared/hook";
import { OrderDefinition } from "gommerce-app-shared/api/definition";
import { UserContext, JwtContext } from "../../../context";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Typography, Grid, Paper, Breadcrumbs, Button, Grow } from "@mui/material";
import { PageContainerGrid } from "../../../atoms";
import { Delete } from "@mui/icons-material";
import { AdminBreadcrumbs } from "../../../organism";
import ResourceMainViewAction from "../../../organism/resource/resource-main-view-action";

const AdminShopOrderPage = () => {
    const [orders, setOrders] = useState<Array<OrderDefinition>>([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);
    const { ordersRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setOrders(await ordersRepository.get(jwt));
        };

        fetch();
    }, []);

    const columns: GridColDef<(typeof orders)[number]>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "fullPrice", headerName: "Full price", width: 200 },
        { field: "customerID", headerName: "Customer ID", width: 100 },
        {
            field: "actions",
            type: "actions",
            width: 170,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => {
                        const destroy = async () => {
                            const response = ordersRepository.delete(Number(params.row.id), jwt);

                            setOrders(await response);
                        }

                        destroy();
                    }}
                />,
            ]
        }
    ];

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Customer", link: "/shop/order" },
            ]} />
            <Grid sx={{ height: "89%" }} item xs={12}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper elevation={3} sx={{ height: "100%" }}>
                        <DataGrid
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={orders}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/shop" createLink="/shop/order/create" />
        </PageContainerGrid>
    );
}

export default AdminShopOrderPage;
