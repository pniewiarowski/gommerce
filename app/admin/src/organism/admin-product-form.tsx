import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { CategoryDefinition, ProductDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryType, productResolver, productType } from "../resolver";
import { JwtContext } from "../context";
import { ResourceFormViewAction } from "./resource";

interface Props {
    default?: ProductDefinition | null
}

const AdminProductForm = (props: Props) => {
    const [categories, setCategories] = useState<Array<CategoryDefinition>>([]);
    const fileUpload = useRef(null);
    const [updatedFileURL, setUpdatedFileURL] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
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
            setCategoryID(props.default.categoryID);
        }
        fetch();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<productType>({ resolver: zodResolver(productResolver) });

    const handleUpload = () => {
        if (fileUpload && fileUpload.current) {
            fileUpload.current.click();
        }
    }

    const handleFileChange = (element: React.ChangeEvent<HTMLInputElement>) => {
        setFile(element.target.files[0]);
        setUpdatedFileURL(URL.createObjectURL(file));
    };

    const onSubmit = async (data: categoryType) => {
        const create = async () => {
            await productRepository.create({
                id: null,
                name: data.name,
                description: data.description,
                enabled: !!enabled,
                price: data.price,
                sortOrder: Number(data.sortOrder),
                categoryID: categoryID,
                imageURL: ""
            }, jwt);

            navigate('/shop/product')
        }

        const update = async () => {
            await productRepository.update({
                id: props.default.id,
                name: data.name,
                description: data.description,
                enabled: enabled,
                price: data.price,
                sortOrder: Number(data.sortOrder),
                categoryID: categoryID,
                imageURL: ""
            }, jwt);
            navigate('/shop/product')
        }

        !props.default && create();
        !!props.default && update();
    }

    return (
        <Box sx={{ maxHeight: "77vh", overflowY: "scroll" }}>
            <form style={{ overflowY: "scroll" }} onSubmit={handleSubmit(onSubmit)}>
                <FormControl sx={{ mt: 2, mb: 2 }} fullWidth>
                    <TextField
                        label="name"
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        defaultValue={props.default ? props.default.name : ""}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </FormControl>
                <div style={{ display: "flex" }}>
                    <FormControl sx={{ mb: 2, mr: 2, width: "30%" }} fullWidth>
                        <Button variant="outlined" sx={{ p: 0.1, m: 0, width: "100%", height: "100%" }} onClick={handleUpload}>
                            {updatedFileURL && <img src={updatedFileURL} height={200} />}
                            {!updatedFileURL && <img src={props.default ? props.default.imageURL : ""} height={200} />}
                        </Button>
                        <input ref={fileUpload} style={{ display: "none" }} id="file" type="file" onChange={handleFileChange} />
                    </FormControl>
                    <FormControl sx={{ mb: 2, width: "70%" }} fullWidth>
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
                </div>
                <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                        label="price"
                        variant="outlined"
                        {...register("price", { valueAsNumber: true })}
                        defaultValue={props.default ? props.default.price : ""}
                        error={!!errors.price}
                        helperText={errors.price ? errors.price.message : ""}
                    />
                </FormControl>
                <div style={{ display: "flex" }}>
                    <FormControl sx={{ mb: 2, mr: 2 }} fullWidth>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                    <FormControl sx={{ mb: 2, mr: 2 }} fullWidth>
                        <Select
                            value={enabled ? 1 : 0}
                            onChange={(event) => setEnabled(Number(event.target.value) === 1)}
                        >
                            <MenuItem value={1}>Enabled</MenuItem>
                            <MenuItem value={0}>Disabled</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                        <TextField
                            label="sort order"
                            variant="outlined"
                            {...register("sortOrder", { valueAsNumber: true })}
                            defaultValue={props.default ? props.default.sortOrder : ""}
                            error={!!errors.sortOrder}
                            helperText={errors.sortOrder ? errors.sortOrder.message : ""}
                        />
                    </FormControl>
                </div>
                <FormControl sx={{ display: "flex", flexDirection: "row" }} fullWidth>
                    <ResourceFormViewAction backLink={"shop/product"} type={props.default ? "save" : "create"} />
                </FormControl>
            </form >
        </Box >
    );
}

export default AdminProductForm;
