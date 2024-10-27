import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Grow, Paper } from "@mui/material";
import { Check, Close, Edit, FileCopy, Visibility } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { JwtContext, UserContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";
import { DeleteResourceTableAction } from "../../../organism/table-action";
import { ResourceMainViewAction } from "../../../organism/resource";
import { AdminBreadcrumbs } from "../../../organism";

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
        {
            field: 'image', headerName: 'Image', width: 180, renderCell: (params) => {
                return <div style={{ display: "flex", alignItems: "center", paddingTop: "12px" }}><img width={70} src={params.row.imageURL} /></div>
            }
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'sortOrder', headerName: 'Sort Order', width: 100 },
        {
            field: 'enabled', headerName: 'Enabled', width: 100, renderCell: (params) => {
                return params.row.enabled ? <Check color="success" /> : <Close color="error" />;
            },
        },
        {
            field: 'categoryID', headerName: 'Category', width: 150, renderCell: (params) => {
                return (
                    <Button sx={{ p: 0, width: "100%", height: "100%" }} onClick={() => navigate(`/shop/category/edit/${params.row.categoryID}`)}>
                        {categories.map((item) => {
                            if (item.id === params.row.categoryID) {
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
                <DeleteResourceTableAction id={params.row.id ?? 0} name={params.row.name ?? ""} setResources={setProducts} resourceRepository={productRepository} />,
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => { navigate(`/shop/product/edit/${params.row.id}`) }}
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
                            const response = productRepository.create({
                                id: null,
                                name: params.row.name,
                                description: params.row.description,
                                price: params.row.price,
                                categoryID: params.row.categoryID,
                                sortOrder: params.row.sortOrder,
                                enabled: params.row.enabled,
                                imageURL: params.row.imageURL,
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
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "Shop", link: "/shop" },
                { label: "Product", link: "/shop/product" },
            ]} />
            <Grid sx={{ height: "89%" }} item xs={12}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper elevation={3} sx={{ height: "100%" }}>
                        <DataGrid
                            checkboxSelection
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={products}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/shop" createLink="/shop/product/create" />
        </PageContainerGrid>
    );
}

export default AdminShopProductPage;
