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
            <DialogTitle sx={{ pl: 4, pt: 4, pr: 4 }}>are you sure you want logout?</DialogTitle>
            <DialogActions sx={{ pl: 4, pb: 4, pr: 4 }}>
                <Button sx={{ mr: 2 }} color="error" onClick={() => setActive(false)}>No</Button>
                <Button variant="contained" onClick={() => logout()}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LogoutDialog;
