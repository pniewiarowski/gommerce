import React from "react";
import {AppBar, Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Person, ShoppingBag} from "@mui/icons-material";
import {Link} from "react-router-dom";

interface Props {
    heading: string,
    elevation?: number,
    showShoppingBagIcon?: boolean,
    showAccountIcon?: boolean,
    showLoginButton?: boolean,
}

const Navbar = (props: Props): React.JSX.Element => {
    const elevation: number = props.elevation === undefined ? 1 : props.elevation;

    return (
        <Box>
            <AppBar position="static" elevation={elevation}>
                <Toolbar variant="regular" sx={{width: "62.5%", mx: "auto"}}>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                        <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Link to="/">
                                <Typography variant="h3" color="secondary" component="div" sx={{ml: 1.25, flexGrow: 1}}>
                                    {props.heading}
                                </Typography>
                            </Link>
                        </Box>
                        <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            {props.showShoppingBagIcon &&
                                <IconButton size="large" color="inherit">
                                    <Badge badgeContent={0} color="secondary">
                                        <ShoppingBag/>
                                    </Badge>
                                </IconButton>}

                            {props.showAccountIcon &&
                                <Link to={"/login"}>
                                    <IconButton size="large" color="inherit">
                                        <Person/>
                                    </IconButton>
                                </Link>}

                            {props.showLoginButton &&
                                <Link to={"/login"}>
                                    <Button sx={{ml: 4}} variant="outlined" color="secondary">login</Button>
                                </Link>}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
