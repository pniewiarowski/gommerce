import { Dispatch, SetStateAction } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
    open: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    logout: () => void;
}

const LogoutDialog = (props: Props) => {
    const { open, setActive, logout } = props;
    return (
        <Dialog open={open}>
            <DialogTitle>are you sure you want logout?</DialogTitle>
            <DialogActions>
                <Button color="error" onClick={() => setActive(false)}>No</Button>
                <Button variant="contained" onClick={() => logout()}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutDialog;
