import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, FormControl, Grow, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryResolver, categoryType } from "../resolver";
import { JwtContext } from "../context";
import { ResourceFormViewAction } from "./resource";

interface Props {
    default?: CategoryDefinition | null
}

const AdminCategoryForm = (props: Props) => {
    const [enabled, setEnabled] = useState<boolean>(true);
    const navigate = useNavigate();
    const { jwt } = useContext(JwtContext);
    const { categoriesRepository } = useBackend();

    useEffect(() => {
        if (props.default) {
            setEnabled(props.default.enabled);
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<categoryType>({ resolver: zodResolver(categoryResolver) });

    const onSubmit = async (data: categoryType) => {
        const create = async () => {
            await categoriesRepository.create({
                id: null,
                name: data.name,
                description: data.description,
                enabled: enabled,
                sortOrder: Number(data.sortOrder),
            }, jwt);
            navigate('/shop/category')
        }

        const update = async () => {
            await categoriesRepository.update({
                id: props.default.id,
                name: data.name,
                description: data.description,
                enabled: enabled,
                sortOrder: Number(data.sortOrder),
            }, jwt);
            navigate('/shop/category')
        }

        !props.default && create();
        props.default && update();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grow in={true} {...{ timeout: 250 }}>
                <Paper elevation={3} sx={{ minHeight: "88vh", p: 2, mb: 1 }}>
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
                    <div style={{ display: "flex" }}>
                        <FormControl sx={{ mb: 2, mr: 2 }} fullWidth>
                            <Select value={enabled ? 1 : 0} onChange={(event) => setEnabled(Number(event.target.value) === 1)}>
                                <MenuItem value={1}>Enabled</MenuItem>
                                <MenuItem value={0}>Disabled</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mb: 2 }} fullWidth>
                            <TextField
                                label="sort order"
                                variant="outlined"
                                type="number"
                                {...register("sortOrder")}
                                defaultValue={props.default ? props.default.sortOrder : ""}
                                error={!!errors.sortOrder}
                                helperText={errors.sortOrder ? errors.sortOrder.message : ""}
                            />
                        </FormControl>
                    </div>
                </Paper>
            </Grow>
            <FormControl sx={{ display: "flex", flexDirection: "row" }} fullWidth>
                <ResourceFormViewAction backLink={"shop/category"} type={props.default ? "save" : "create"} />
            </FormControl>
        </form >
    );
}

export default AdminCategoryForm;
