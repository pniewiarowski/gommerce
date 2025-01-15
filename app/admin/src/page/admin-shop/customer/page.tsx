import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Grow } from "@mui/material"
import { Check, Close } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomerDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { PageContainerGrid } from "../../../atoms"
import { JwtContext, UserContext } from "../../../context";
import { DeleteResourceTableAction } from "../../../organism/table-action";
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
                <DeleteResourceTableAction
                    id={params.row.id ?? 0}
                    name={`${params.row.firstName} ${params.row.lastName}`}
                    setResources={setCustomers}
                    resourceRepository={customersRepository}
                    resource="customer"
                />,
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
                            checkboxSelection
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={customers ?? []}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/shop" />
        </PageContainerGrid>
    );
}

export default AdminShopCustomerPage;
