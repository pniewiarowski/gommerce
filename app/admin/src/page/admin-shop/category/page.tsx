import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Check, Close, Delete, Edit, FileCopy, Visibility } from "@mui/icons-material";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { JwtContext, UserContext } from "../../../context";
import { PageContainerGrid, PageTitle } from "../../../atoms";
import { DeleteCategoryTableAction } from "../../../organism/table-action";

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
            },
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
            <Grid item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="text.primary">Shop</Typography>
                        </Link>
                        <Link to="/shop/category">
                            <Typography color="primary">Category</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid sx={{ height: "87%" }} item xs={12}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                    <DataGrid
                        rows={categories}
                        columns={columns}
                        density="comfortable"
                        disableColumnSelector
                    />
                </Paper>
            </Grid>
            <Grid sx={{ mt: 1.5 }} item xs={12}>
                <Button sx={{ p: 2, width: 200, mr: 2 }} color="error" variant="outlined" onClick={() => navigate('/shop')}>
                    back
                </Button>
                <Button sx={{ p: 2, width: 200 }} color="primary" variant="contained" onClick={() => navigate('/shop/category/create')}>
                    add
                </Button>
            </Grid>
        </PageContainerGrid>
    )
}

export default AdminShopCategoryPage;
