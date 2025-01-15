import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Grow, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddressDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { UserContext, JwtContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";
import { AdminBreadcrumbs } from "../../../organism";
import { ResourceMainViewAction } from "../../../organism/resource";
import { DeleteResourceTableAction } from "../../../organism/table-action";

const AdminShopAddressPage = () => {
    const [addresses, setAddresses] = useState<Array<AddressDefinition>>([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { addressesRepository } = useBackend();
    const { jwt } = useContext(JwtContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        (async () => setAddresses(await addressesRepository.get(jwt)))();
    });

    const columns: GridColDef<(typeof addresses)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'city', headerName: 'City', width: 100 },
        { field: 'country', headerName: 'Country', width: 100 },
        { field: 'street', headerName: 'Street', width: 100 },
        { field: 'streetNumber', headerName: 'Street Number', width: 100 },
        { field: 'apartmentNumber', headerName: 'Apartment Number', width: 100 },
        { field: 'state', headerName: 'State', width: 100 },
        { field: 'createdAt', headerName: "Created At", width: 100 },
        { field: 'customerID', headerName: "Related Customer", width: 100 },
        {
            field: "actions",
            type: "actions",
            width: 170,
            getActions: (params) => [
                <DeleteResourceTableAction
                    id={params.row.id ?? 0}
                    name={`${params.row.street} ${params.row.streetNumber}` ?? ""}
                    setResources={setAddresses}
                    resourceRepository={addressesRepository}
                    resource="address"
                />,
            ]
        }
    ];

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Address", link: "/shop/address" },
            ]} />
            <Grid sx={{ height: "89%" }} item xs={12}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper elevation={3} sx={{ height: "100%" }}>
                        <DataGrid
                            checkboxSelection
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={addresses ?? []}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/shop" createLink="/shop/address/create" />
        </PageContainerGrid>
    )
}

export default AdminShopAddressPage;
