import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Grow, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Check, Close, Edit, FileCopy, Visibility } from "@mui/icons-material";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { AdminBreadcrumbs } from "../../../organism";
import { DeleteCategoryTableAction } from "../../../organism/table-action";
import { JwtContext, UserContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";
import { ResourceMainViewAction } from "../../../organism/resource";

const AdminShopCategoryPage = () => {
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { categoriesRepository } = useBackend();
    const { jwt } = useContext(JwtContext);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => setCategories(await categoriesRepository.get());
        fetch();
    }, []);

    const columns: GridColDef<(typeof categories)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'description', headerName: 'Description', width: 550 },
        {
            field: 'enabled', headerName: 'Enabled', width: 100, renderCell: (params) => {
                return params.value ? <Check color="success" /> : <Close color="error" />;
            }
        },
        { field: 'sortOrder', headerName: 'Sort order', width: 100 },
        {
            field: 'actions',
            type: 'actions',
            width: 170,
            getActions: (params) => [
                <DeleteCategoryTableAction id={params.row.id ?? 0} name={params.row.name ?? ""} setCategories={setCategories} />,
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => { navigate(`/shop/category/edit/${params.row.id}`) }}
                />,
                <GridActionsCellItem
                    icon={<Visibility />}
                    label="Show"
                    onClick={() => { }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<FileCopy />}
                    label="Duplicate"
                    onClick={() => {
                        const duplicate = async () => {
                            const response = categoriesRepository.create({
                                id: null,
                                name: params.row.name,
                                description: params.row.description,
                                enabled: params.row.enabled,
                                sortOrder: params.row.sortOrder,
                            }, jwt);

                            setCategories([...categories, await response]);
                        }

                        duplicate();
                    }}
                    showInMenu
                />,
            ],
        },
    ];

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Category", link: "/shop/category" },
            ]} />
            <Grid sx={{ height: "89%" }} item xs={12}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper elevation={3} sx={{ height: "100%" }}>
                        <DataGrid
                            checkboxSelection
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={categories}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/shop" createLink="/shop/category/create" />
        </PageContainerGrid>
    )
}

export default AdminShopCategoryPage;
