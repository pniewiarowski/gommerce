import React from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Delete } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useBackend } from "gommerce-app-shared/hook";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { JwtContext } from "../../context";
import { DeleteDialog } from "../dialog";

interface Props {
    id: number,
    name: string,
    setCategories: Dispatch<SetStateAction<CategoryDefinition[]>>;
}

const DeleteCategoryTableAction = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, name, setCategories } = props;
    const { categoriesRepository } = useBackend();
    const { jwt } = useContext(JwtContext);

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Delete color="error" />}
                label="Delete"
                onClick={() => setIsOpen(true)}
            />
            <DeleteDialog name={name} resource="category" handleDelete={() => {
                const destroy = async () => {
                    const response = categoriesRepository.delete(Number(id), jwt);

                    setCategories(await response);
                }

                destroy();
            }} setActive={setIsOpen} open={isOpen} />
        </React.Fragment>
    );
}

export default DeleteCategoryTableAction;
