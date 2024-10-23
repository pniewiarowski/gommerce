import { Dispatch, SetStateAction } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
    name: string;
    open: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => void;
}

const DeleteCustomerDialog = (props: Props) => {
    const { open, setActive, handleDelete, name } = props;

    return (
        <Dialog open={open}>
            <DialogTitle sx={{ pl: 4, pt: 4, pr: 4 }}>are you sure you want delete {name} customer?</DialogTitle>
            <DialogActions sx={{ pl: 4, pb: 4, pr: 4 }}>
                <Button sx={{ mr: 2 }} color="error" onClick={() => setActive(false)}>No</Button>
                <Button variant="contained" onClick={() => handleDelete()}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteCustomerDialog;
