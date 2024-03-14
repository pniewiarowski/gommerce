import React, {useEffect, useState} from "react";
import {Box, Breadcrumbs, Grid, Paper, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import CategoryDefinition from "../api/definition/category-definition.ts";
import useBackend from "../hook/use-backend.ts";

const ShopCategoryPage = (): React.JSX.Element => {
    const {categoriesRepository} = useBackend();
    const { id } = useParams();
    const [category, setCategory] = useState<CategoryDefinition>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async() => {
            setCategory(await categoriesRepository.getByID(Number(id)));
        }

        fetchCategory();
    }, [id]);

    return (
        <Box>
            <Grid sx={{width: "70%", mx: "auto"}} container spacing={1}>
                <Grid sx={{mt: 1}} item xs={12} >
                    <Paper sx={{p: 1}}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/">
                                <Typography color="text.primary">Home</Typography>
                            </Link>
                            <Link to={`/category/${category?.id}`}>
                                <Typography color="secondary">{category?.name}</Typography>
                            </Link>
                        </Breadcrumbs>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShopCategoryPage;
