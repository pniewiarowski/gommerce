import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Divider, Breadcrumbs, Grid, Paper, Button, Grow } from "@mui/material"
import { Check, Close, Delete, Edit, FileCopy, Visibility } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CustomerDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { PageContainerGrid } from "../../../atoms"
import { JwtContext, UserContext } from "../../../context";
import { DeleteCustomerTableAction } from "../../../organism/table-action";
import { AdminBreadcrumbs } from "../../../organism";
import { ResourceMainViewAction } from "../../../organism/resource";

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
            setCustomers(await customersRepository.get(jwt));
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
        { field: "userID", headerName: "User ID", width: 100 },
        {
            field: 'actions',
            type: 'actions',
            width: 170,
            getActions: (params) => [
                <DeleteCustomerTableAction id={params.row.id ?? 0} name={`${params.row.firstName} ${params.row.lastName}`} setCustomers={setCustomers} />,
                <GridActionsCellItem icon={<Edit />} label="Edit" onClick={() => { navigate(`/shop/customer/edit/${params.row.id}`) }} />,
                <GridActionsCellItem icon={<Visibility />} label="Show" onClick={() => { }} showInMenu />,
            ],
        },
    ];

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Customer", link: "/shop/customer" },
            ]} />
            <Grid sx={{ height: "89%" }} item xs={12}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper elevation={3} sx={{ height: "100%" }}>
                        <DataGrid
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={customers}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/shop" createLink="/shop/customer/create" />
        </PageContainerGrid>
    );
}

export default AdminShopCustomerPage;
