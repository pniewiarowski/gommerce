import React from "react";
import {AppBar, Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Person, ShoppingBag} from "@mui/icons-material";

interface Props {
    heading?: string,
    elevation?: number,
    showShoppingBagIcon?: boolean,
    showAccountIcon?: boolean,
    showLoginButton?: boolean,
}

const Navbar = (props: Props): React.JSX.Element => {
    const elevation: number = props.elevation === undefined ? 1 : props.elevation;

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" elevation={elevation}>
                <Toolbar variant="regular" sx={{width: "62.5%", mx: "auto"}}>
                    {props.heading && <Typography variant="h3" color="secondary" component="div" sx={{ml: 1.25, flexGrow: 1}}>{props.heading}</Typography>}
                    {props.showShoppingBagIcon &&
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <ShoppingBag/>
                            </Badge>
                        </IconButton>}
                    {props.showAccountIcon &&
                        <IconButton size="large" color="inherit">
                            <Person/>
                        </IconButton>}
                    {props.showLoginButton && <Button sx={{ml: 4}} variant="outlined" color="secondary">login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
