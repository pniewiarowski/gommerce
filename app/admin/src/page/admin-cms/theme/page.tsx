import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Grow, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useBackend } from "gommerce-app-shared/hook";
import { ThemeDefinition } from "gommerce-app-shared/api/definition";
import { UserContext, JwtContext } from "../../../context";
import { PageContainerGrid } from "../../../atoms";
import { AdminBreadcrumbs } from "../../../organism";
import { ResourceMainViewAction } from "../../../organism/resource";
import { DeleteResourceTableAction } from "../../../organism/table-action";
import { Edit, FileCopy, Visibility } from "@mui/icons-material";

const AdminCMSThemePage = () => {
    const [themes, setThemes] = useState<Array<ThemeDefinition>>([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { jwt } = useContext(JwtContext);
    const { themeRepository } = useBackend();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            setThemes(await themeRepository.get(jwt));
        })();
    }, []);

    const columns: GridColDef<(typeof themes)[number]>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: 'title', headerName: 'Title', width: 350 },
        {
            field: 'actions',
            type: 'actions',
            width: 170,
            getActions: (params) => [
                <DeleteResourceTableAction
                    id={params.row.id ?? 0}
                    name={params.row.title ?? ""}
                    setResources={setThemes}
                    resourceRepository={themeRepository}
                    resource="theme"
                />,
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
                    onClick={() => { }}
                    showInMenu
                />,
            ],
        },
    ];

    return (
        <PageContainerGrid>
            <AdminBreadcrumbs breadcrumbs={[
                { label: "Home", link: "/" },
                { label: "CMS", link: "/cms" },
                { label: "Theme", link: "/cms/theme" },
            ]} />
            <Grid sx={{ height: "89%" }} item xs={12}>
                <Grow in={true} {...{ timeout: 250 }}>
                    <Paper elevation={3} sx={{ height: "100%" }}>
                        <DataGrid
                            checkboxSelection
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            rows={themes ?? []}
                            columns={columns}
                            density="comfortable"
                            disableColumnSelector
                        />
                    </Paper>
                </Grow>
            </Grid>
            <ResourceMainViewAction backLink="/cms" createLink="/cms/theme/create" />
        </PageContainerGrid>
    );
}

export default AdminCMSThemePage;
