import { Dispatch, SetStateAction } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
    open: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    make: () => void;
}

const MakeOrderDialog = (props: Props) => {
    const { open, setActive, make } = props;

    return (
        <Dialog open={open}>
            <DialogTitle sx={{ pl: 4, pt: 4, pr: 4 }}>are you sure you want to make your order?</DialogTitle>
            <DialogActions sx={{ pl: 4, pb: 4, pr: 4 }}>
                <Button sx={{ mr: 2 }} color="error" onClick={() => setActive(false)}>No</Button>
                <Button color="success" variant="contained" onClick={() => make()}>Make</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MakeOrderDialog;
