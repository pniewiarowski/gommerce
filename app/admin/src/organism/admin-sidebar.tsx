import { Avatar, Container, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Theme, Typography, useTheme } from "@mui/material";
import { Home, Logout, Mail, Payment, Person, Settings, ShoppingBag } from "@mui/icons-material";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "gommerce-app-shared/hook";
import { UserContext, JwtContext } from "../context";
import { LogoutDialog } from "./dialog";

class SidebarItem {
    public constructor(
        public readonly ID: number,
        public readonly label: string,
        public readonly action: () => void,
        public readonly icon: JSX.Element | null = null,
    ) {
    }
}

const AdminSidebar = () => {
    const [active, setActive] = useState(0);
    const [logoutDialogActive, setLogoutDialogActive] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { setJwt } = useContext(JwtContext);
    const { clear } = useCookies();
    const theme: Theme = useTheme();

    const logout = () => {
        setUser(null);
        setJwt(null);
        clear();
        navigate("/login");
    }

    const activeDialog = () => {
        setLogoutDialogActive(true);
    };

    const itemsJSX = [
        new SidebarItem(1, 'Home', () => { setActive(1); navigate("/"); }, <Home />),
        new SidebarItem(2, 'Shop', () => { setActive(2); navigate("/shop"); }, <ShoppingBag />),
        new SidebarItem(3, 'Mailing', () => { setActive(3); navigate("/mailing"); }, <Mail />),
        new SidebarItem(4, 'Account', () => { setActive(4); navigate("/account"); }, <Person />),
        new SidebarItem(5, 'Payment', () => { setActive(5); navigate("/payment"); }, <Payment />),
        new SidebarItem(6, 'Settings', () => { setActive(6); navigate("/settings"); }, <Settings />),
    ].map((item) => {
        return (
            <Fragment>
                <ListItemButton
                    key={item.ID}
                    sx={{ p: 1 }}
                    onClick={() => item.action()}
                >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {item.label}
                    </ListItemText>
                </ListItemButton>
                <Divider />
            </Fragment>
        )
    });

    itemsJSX.push(
        <Fragment>
            <ListItemButton
                sx={{ p: 1 }}
                onClick={activeDialog}>
                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                    <Logout />
                </ListItemIcon>
                <ListItemText sx={{ color: theme.palette.error.main }}>
                    Logout
                </ListItemText>
            </ListItemButton>
        </Fragment>
    );

    return (
        <Grid item xs={12} xl={1.5} sx={{ height: "100vh", }}>
            <LogoutDialog open={logoutDialogActive} setActive={setLogoutDialogActive} logout={logout} />
            <Paper sx={{ height: "100%" }} elevation={3}>
                <Container sx={{ p: 3 }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                        <Avatar sx={{ mr: 3 }} />
                        <Typography sx={{ fontWeight: "bold" }}>Admin</Typography>
                    </div>
                    <List sx={{ height: "100%" }}>
                        {itemsJSX}
                    </List>
                </Container>
            </Paper>
        </Grid>
    );
}

export default AdminSidebar;
