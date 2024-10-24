import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBackend } from "gommerce-app-shared/hook";
import { OrderDefinition } from "gommerce-app-shared/api/definition";
import { UserContext, JwtContext } from "../../../context";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Typography, Grid, Paper, Breadcrumbs, Button } from "@mui/material";
import { PageContainerGrid } from "../../../atoms";
import { Delete } from "@mui/icons-material";

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
            <Grid item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="text.primary">Shop</Typography>
                        </Link>
                        <Link to="/shop/order">
                            <Typography color="primary">Order</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid sx={{ height: "87%" }} item xs={12}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        density="comfortable"
                        disableColumnSelector
                    />
                </Paper>
            </Grid>
            <Grid sx={{ mt: 1.5 }} item xs={12}>
                <Button sx={{ p: 2, width: 200, mr: 2 }} color="error" variant="outlined" onClick={() => navigate("/shop")}>
                    go back
                </Button>
                <Button sx={{ p: 2, width: 200 }} color="primary" variant="contained" onClick={() => navigate("/shop/order/create")}>
                    add
                </Button>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopOrderPage;
