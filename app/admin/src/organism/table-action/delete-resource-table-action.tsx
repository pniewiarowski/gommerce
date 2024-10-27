import { Delete } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useState, useContext } from "react";
import { JwtContext } from "../../context";
import { DeleteDialog } from "../dialog";
import { Repository } from "gommerce-app-shared/api/repository/type";

interface Props {
    id: number,
    name: string,
    resource: string,
    setResources: Dispatch<SetStateAction<any[]>>;
    resourceRepository: Repository,
}

const DeleteResourceTableAction = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, name, setResources, resourceRepository } = props;
    const { jwt } = useContext(JwtContext);

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Delete color="error" />}
                label="Delete"
                onClick={() => setIsOpen(true)}
            />
            <DeleteDialog name={name} resource={props.resource} handleDelete={() => {
                const destroy = async () => {
                    const response = resourceRepository.delete(Number(id), jwt);

                    setResources(await response);
                }

                destroy();
            }} setActive={setIsOpen} open={isOpen} />
        </React.Fragment>
    );
}

export default DeleteResourceTableAction;
