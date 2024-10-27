import React from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Delete } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useBackend } from "gommerce-app-shared/hook";
import { CustomerDefinition } from "gommerce-app-shared/api/definition";
import { JwtContext } from "../../context";
import { DeleteDialog } from "../dialog";

interface Props {
    id: number,
    name: string,
    setCustomers: Dispatch<SetStateAction<CustomerDefinition[]>>;
}

const DeleteCustomerTableAction = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, name, setCustomers } = props;
    const { customersRepository } = useBackend();
    const { jwt } = useContext(JwtContext);

    return (
        <React.Fragment>
            <GridActionsCellItem
                icon={<Delete color="error" />}
                label="Delete"
                onClick={() => setIsOpen(true)}
            />
            <DeleteDialog name={name} resource="customer" handleDelete={() => {
                const destroy = async () => {
                    const response = customersRepository.delete(Number(id), jwt);

                    setCustomers(await response);
                }

                destroy();
            }} setActive={setIsOpen} open={isOpen} />
        </React.Fragment>
    );
}

export default DeleteCustomerTableAction;
