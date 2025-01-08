import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Bookmark, Settings, Close, Logout } from "@mui/icons-material";
import { MenuItem, Typography } from "@mui/material";
import { useCookies } from "gommerce-app-shared/hook";
import { CustomerContext } from "../context";
import { LogoutDialog } from "./dialog";

interface Props {
    close: () => void,
}

const CustomerMenu = (props: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { clear } = useCookies();
    const navigate = useNavigate();
    const { setCustomer } = useContext(CustomerContext);

    const handleClickLogout = () => {
        setIsDialogOpen(true);
    }

    const logout = () => {
        clear();
        setCustomer(null);
        navigate('/login');
    }

    return (
        <Fragment>
            <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={() => {
                props.close();
                navigate('/order');
            }}>
                <ShoppingBag sx={{ mr: 1 }} />
                <Typography>My orders</Typography>
            </MenuItem>
            <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={props.close}>
                <Bookmark sx={{ mr: 1 }} />
                <Typography>Following items</Typography>
            </MenuItem>
            <Link to="/settings">
                <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={props.close}>
                    <Settings sx={{ mr: 1 }} />
                    <Typography>Settings</Typography>
                </MenuItem>
            </Link>
            <MenuItem sx={{ ml: 1, mr: 1, p: 1 }} onClick={props.close}>
                <Close sx={{ mr: 1 }} />
                <Typography>Close</Typography>
            </MenuItem>
            <MenuItem color="error" sx={{ ml: 1, mr: 1, p: 1 }} onClick={handleClickLogout}>
                <Logout sx={{ mr: 1 }} />
                <Typography>Logout</Typography>
            </MenuItem>
            <LogoutDialog open={isDialogOpen} setActive={setIsDialogOpen} logout={logout} />
        </Fragment>
    );
}

export default CustomerMenu;