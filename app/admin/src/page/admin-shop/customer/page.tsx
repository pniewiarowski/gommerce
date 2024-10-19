import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Divider, Breadcrumbs, Grid, Paper, Button } from "@mui/material"
import { Check, Close, Delete, Edit, FileCopy } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CustomerDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { PageContainerGrid } from "../../../atoms"
import { JwtContext, UserContext } from "../../../context";

const AdminShopCustomerPage = () => {
    const [customers, setCustomers] = useState<Array<CustomerDefinition>>([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);
    const { customersRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setCustomers(await customersRepository.get());
        };

        fetch();
    }, []);

    const columns: GridColDef<(typeof customers)[number]>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "firstName", headerName: "First Name", width: 440 },
        { field: "lastName", headerName: "Last Name", width: 440 },
        {
            field: "isActive", headerName: "Is Active", width: 100, renderCell: (params) => {
                return params.row.isActive ? <Check color="success" /> : <Close color="error" />;
            },
        },
        { field: "userId", headerName: "User ID", width: 100 },
        {
            field: 'actions',
            type: 'actions',
            width: 170,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => {
                        const destroy = async () => {
                            const response = customersRepository.delete(Number(params.row.id), jwt);

                            setCustomers(await response);
                        }

                        destroy();
                    }}
                />,
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => { navigate(`/shop/customer/edit/${params.row.id}`) }}
                />,
            ],
        },
    ];

    return (
        <PageContainerGrid>
            <Grid item xs={12} sx={{ mb: 1 }}>
                <Paper sx={{ p: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="text.primary">Shop</Typography>
                        </Link>
                        <Link to="/shop/customer">
                            <Typography color="primary">Customer</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid sx={{ height: "87%" }} item xs={12}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                    <DataGrid
                        rows={customers}
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
                <Button sx={{ p: 2, width: 200 }} color="primary" variant="contained" onClick={() => navigate("/shop/customer/create")}>
                    add
                </Button>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopCustomerPage;
