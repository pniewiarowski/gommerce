import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Bookmark, Settings, Close, Logout } from "@mui/icons-material";
import { MenuItem, Typography } from "@mui/material";
import { useCookies } from "gommerce-app-shared/hook";
import { CustomerContext } from "../context";

interface Props {
    close: () => void,
}

const CustomerMenu = (props: Props) => {
    const { clear } = useCookies();
    const navigate = useNavigate();
    const { setCustomer } = useContext(CustomerContext);

    const logout = () => {
        clear();
        setCustomer(null);
        navigate('/login');
    }

    return (
        <Fragment>
            <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={props.close}>
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
            <MenuItem sx={{ ml: 1, mr: 1, p: 1 }} onClick={logout}>
                <Logout sx={{ mr: 1 }} />
                <Typography>Logout</Typography>
            </MenuItem>
        </Fragment>
    );
}

export default CustomerMenu;