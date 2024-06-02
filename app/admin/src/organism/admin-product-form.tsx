import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { productResolver, productType } from "../resolver";
import { JwtContext } from "../context";

interface Props {
    default?: ProductDefinition | null
}

const AdminProductForm = (props: Props) => {
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const [enabled, setEnabled] = useState<boolean>(true);
    const [categoryID, setCategoryID] = useState(0);
    const navigate = useNavigate();
    const { jwt } = useContext(JwtContext);
    const { categoriesRepository, productRepository } = useBackend();

    useEffect(() => {
        const fetch = async () => {
            setCategories(await categoriesRepository.get());
        }

        if (props.default) {
            setCategoryID(props.default.categoryId);
        }
        fetch();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<productType>({ resolver: zodResolver(productResolver) });

    const onSubmit = async (data: categoryType) => {
        const create = async () => {
            await productRepository.create({
                id: null,
                name: data.name,
                description: data.description,
                enabled: !!enabled,
                price: data.price,
                sortOrder: Number(data.sortOrder),
                categoryId: categoryID,
            }, jwt);
            navigate('/shop/product')
        }

        const update = async () => {
            await productRepository.create({
                id: props.default.id,
                name: data.name,
                description: data.description,
                enabled: enabled,
                price: data.price,
                sortOrder: Number(data.sortOrder),
                categoryId: categoryID,
            }, jwt);
            navigate('/shop/product')
        }

        !props.default && create();
        props.default && update();
    }

    return (
        <Box sx={{ maxHeight: "77vh", overflowY: "scroll" }}>
            <form style={{ overflowY: "scroll" }} onSubmit={handleSubmit(onSubmit)}>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                        label="name"
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        defaultValue={props.default ? props.default.name : ""}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                        label="description"
                        variant="outlined"
                        multiline
                        minRows={10}
                        {...register("description")}
                        defaultValue={props.default ? props.default.description : ""}
                        error={!!errors.description}
                        helperText={errors.description ? errors.description.message : ""}
                    />
                </FormControl>
                <FormControl sx={{ mb: 3 }} fullWidth>
                    <TextField
                        label="price"
                        variant="outlined"
                        {...register("price", { valueAsNumber: true })}
                        defaultValue={props.default ? props.default.price : ""}
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ""}
                    />
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{ width: "7%", fontWeight: "light", ml: 1 }}>
                            category:
                        </Typography>
                        <Select
                            fullWidth
                            value={categoryID}
                            onChange={(event) => setCategoryID(Number(event.target.value))}>
                            {categories.map((category) => {
                                return (
                                    <MenuItem value={category.id}>{category.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </div>
                </FormControl>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <Select
                        value={enabled ? 1 : 0}
                        onChange={(event) => setEnabled(Number(event.target.value) === 1)}
                    >
                        <MenuItem value={1}>Enabled</MenuItem>
                        <MenuItem value={0}>Disabled</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mb: 3 }} fullWidth>
                    <TextField
                        label="sort order"
                        variant="outlined"
                        {...register("sortOrder", { valueAsNumber: true })}
                        defaultValue={props.default ? props.default.sortOrder : ""}
                        error={!!errors.sortOrder}
                        helperText={errors.sortOrder ? errors.sortOrder.message : ""}
                    />
                </FormControl>
                <FormControl sx={{ display: "flex", flexDirection: "row" }} fullWidth>
                    <Button
                        sx={{ p: 2, width: 200, mr: 2 }}
                        color="error"
                        variant="outlined"
                        onClick={() => navigate('/shop/product')}
                    >
                        go back
                    </Button>
                    <Button
                        sx={{ p: 2, width: 200 }}
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        {props.default ? "save" : "create"}
                    </Button>
                </FormControl>
            </form>
        </Box>
    );
}

export default AdminProductForm;
