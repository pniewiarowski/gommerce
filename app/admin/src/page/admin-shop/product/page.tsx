import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Check, Close, Delete, Edit, FileCopy } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { JwtContext, UserContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";

const AdminShopProductPage = () => {
    const [products, setProducts] = useState<Array<ProductDefinition>>([]);
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);
    const { productRepository, categoriesRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            setProducts(await productRepository.get());
            setCategories(await categoriesRepository.get());
        };

        fetch();
    }, []);

    const columns: GridColDef<(typeof products)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 270 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'sortOrder', headerName: 'Sort Order', width: 150 },
        {
            field: 'enabled', headerName: 'Enabled', width: 100, renderCell: (params) => {
                return params.row.enabled ? <Check color="success" /> : <Close color="error" />;
            },
        },
        {
            field: 'categoryId', headerName: 'Category', width: 250, renderCell: (params) => {
                return (
                    <Button
                        sx={{ p: 0, width: "100%", height: "100%" }}
                        onClick={() => navigate(`/shop/category/edit/${params.row.categoryId}`)}
                    >
                        {categories.map((item) => {
                            if (item.id === params.row.categoryId) {
                                return item.name;
                            }
                        })}
                    </Button>
                );
            }
        },
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
                            const response = productRepository.delete(Number(params.row.id), jwt);

                            setProducts(await response);
                        }

                        destroy();
                    }}
                />,
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => { navigate(`/shop/product/edit/${params.row.id}`) }}
                />,
                <GridActionsCellItem
                    icon={<FileCopy />}
                    label="Duplicate"
                    onClick={() => {
                        const duplicate = async () => {
                            const response = productRepository.create({
                                id: null,
                                name: params.row.name,
                                description: params.row.description,
                                price: params.row.price,
                                categoryId: params.row.categoryId,
                                sortOrder: params.row.sortOrder,
                                enabled: params.row.enabled,
                            }, jwt);

                            setProducts([...products, await response]);
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
            <Typography sx={{ fontSize: 40, }} variant="h2">products</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Grid sx={{ mt: 1 }} item xs={12}>
                <Paper sx={{ p: 1, mb: 1 }} elevation={3}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Typography color="text.primary">Home</Typography>
                        </Link>
                        <Link to="/shop">
                            <Typography color="text.primary">Shop</Typography>
                        </Link>
                        <Link to="/shop/product">
                            <Typography color="primary">Product</Typography>
                        </Link>
                    </Breadcrumbs>
                </Paper>
            </Grid>
            <Grid sx={{ mt: 2, height: "78%" }} item xs={12}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        density="comfortable"
                        disableColumnSelector
                    />
                </Paper>
            </Grid>
            <Grid sx={{ mt: 1.5 }} item xs={12}>
                <Button sx={{ p: 2, width: 200, mr: 2 }} color="error" variant="outlined" onClick={() => navigate('/shop')}>
                    go back
                </Button>
                <Button sx={{ p: 2, width: 200 }} color="primary" variant="contained" onClick={() => navigate('/shop/product/create')}>
                    add
                </Button>
            </Grid>
        </PageContainerGrid>
    );
}

export default AdminShopProductPage;
