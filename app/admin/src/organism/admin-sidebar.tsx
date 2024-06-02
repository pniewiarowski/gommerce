import { Button, Container, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { Home, Mail, Payment, Person, Settings, ShoppingBag } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "gommerce-app-shared/hook";

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
    const navigate = useNavigate();

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
                    sx={{ p: 2 }}
                    selected={active === item.ID}
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

    return (
        <Grid item xs={12} xl={3} sx={{ height: "100vh", }}>
            <Paper sx={{ height: "100%" }} elevation={3}>
                <Container>
                    <div style={{ display: "flex" }}>
                        <img
                            style={{ transform: "translateY(24px)", marginRight: "15px" }}
                            src="administrator.png"
                            width={64}
                            height={64}
                        />
                        <Typography sx={{ fontSize: 40, pt: 4 }} variant="h2">admin panel</Typography>
                    </div>
                    <Divider sx={{ mt: 2, mb: 1 }} />
                    <List sx={{ height: "100%" }}>
                        {itemsJSX}
                    </List>
                </Container>
            </Paper>
        </Grid>
    );
}

export default AdminSidebar;
