import React from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Delete } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useBackend } from "gommerce-app-shared/hook";
import { ProductDefinition } from "gommerce-app-shared/api/definition";
import { JwtContext } from "../../context";
import { DeleteDialog } from "../dialog";

interface Props {
    id: number,
    name: string,
    setProducts: Dispatch<SetStateAction<ProductDefinition[]>>;
}

const DeleteProductTableAction = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, name, setProducts } = props;
    const { productRepository } = useBackend();
    const { jwt } = useContext(JwtContext);

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Delete color="error" />}
                label="Delete"
                onClick={() => setIsOpen(true)}
            />
            <DeleteDialog name={name} resource="product" handleDelete={() => {
                const destroy = async () => {
                    const response = productRepository.delete(Number(id), jwt);

                    setProducts(await response);
                }

                destroy();
            }} setActive={setIsOpen} open={isOpen} />
        </React.Fragment>
    );
}

export default DeleteProductTableAction;
