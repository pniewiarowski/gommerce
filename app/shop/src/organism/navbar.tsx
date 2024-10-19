import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Badge,
    Box,
    Divider,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    Avatar,
    ListItem,
    List,
    TextField,
    InputAdornment,
} from "@mui/material";
import { Person, ShoppingBag, Search as SearchIcon } from "@mui/icons-material";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { CustomerContext, ShopBagContext } from "../context";
import { stringAvatar } from "../util";
import CustomerMenu from "./customer-menu";
import CustomerShoppingBag from "./customer-shopping-bag";

interface Props {
    heading: string,
    elevation?: number,
    width: string,
    categories: Array<CategoryDefinition>
}

const Navbar = (props: Props): React.JSX.Element => {
    const [anchorElCustomerMenu, setAnchorElCustomerMenu] = React.useState<null | HTMLElement>(null);
    const [anchorElShoppingBag, setAnchorElShoppingBag] = React.useState<null | HTMLElement>(null);
    const { customer } = useContext(CustomerContext);
    const { shopBag, setShopBag } = useContext(ShopBagContext);

    const openCustomerMenu = Boolean(anchorElCustomerMenu);
    const openShoppingBag = Boolean(anchorElShoppingBag);
    const elevation: number = 3;

    useEffect(() => {
        handleCloseCustomerMenu();
    }, [customer]);

    const handleCloseCustomerMenu = () => {
        setAnchorElCustomerMenu(null);
    }

    const handleCloseShoppingBag = () => {
        setAnchorElShoppingBag(null);
    }

    const handleOpenCustomerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCustomerMenu(event.currentTarget);
    }

    const handleOpenShoppingBag = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElShoppingBag(event.currentTarget);
    }

    const categoriesToRender: Array<React.JSX.Element> = props.categories?.map((category: CategoryDefinition, i: number) => {
        return (
            <React.Fragment key={category.id}>
                {i != 0 && <Divider orientation="vertical" flexItem />}
                <Link to={`/category/${category.id}`} key={category.id}>
                    <Typography variant="h4" color={"text.primary"} component="div" sx={{ ml: 1, mr: 1, flexGrow: 1 }}>
                        {category.name.toLowerCase()}
                    </Typography>
                </Link>
            </React.Fragment>
        )
    });

    return (
        <Box>
            <AppBar position="static" elevation={elevation}>
                <Toolbar variant="regular" sx={{ width: props.width, mx: "auto" }}>
                    <Box
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Box style={{ display: "flex", alignItems: "center", width: "25%" }}>
                            <Box sx={{ mr: 2 }}>
                                <Link to="/">
                                    <Typography variant="h3" color="secondary" component="div" sx={{ ml: 1.25, flexGrow: 1 }}>
                                        {props.heading}
                                    </Typography>
                                </Link>
                            </Box>
                            <Box>
                                <TextField size="small" variant="outlined" InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                            </Box>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%" }}>
                            {categoriesToRender}
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "end", alignItems: "center", width: "25%" }} color="text.primary">
                            <div onClick={handleOpenShoppingBag}>
                                <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
                                    <Badge badgeContent={shopBag.length} color="secondary">
                                        <ShoppingBag />
                                    </Badge>
                                </IconButton>
                            </div>
                            <Menu
                                id="shopping-bag"
                                anchorEl={anchorElShoppingBag}
                                open={openShoppingBag}
                                onClose={handleCloseShoppingBag}
                                elevation={7}
                                sx={{ left: "-230px", top: "8px" }}
                                MenuListProps={{ "aria-labelledby": "basic-button" }}>
                                <Fragment>
                                    <List sx={{ maxHeight: "400px", width: "344px", p: 2 }}>
                                        <CustomerShoppingBag close={handleCloseShoppingBag} checkoutLink={true} />
                                        {shopBag.length === 0 &&
                                            <ListItem sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}>
                                                <Typography>there is nothing in your shopping bag</Typography>
                                            </ListItem>}
                                    </List>
                                </Fragment>
                            </Menu>
                            {!customer &&
                                <Link to={"/login"}>
                                    <IconButton size="large" color="inherit">
                                        <Person />
                                    </IconButton>
                                </Link>
                            }
                            {customer &&
                                <div>
                                    <div onClick={handleOpenCustomerMenu}>
                                        <Avatar {...stringAvatar(`${customer.firstName}`, true)}></Avatar>
                                    </div>
                                    <Menu
                                        id="customer-menu"
                                        anchorEl={anchorElCustomerMenu}
                                        open={openCustomerMenu}
                                        sx={{ transform: "translateX(-7%) translateY(1%)" }}
                                        onWheel={handleCloseCustomerMenu}
                                        onClose={handleCloseCustomerMenu}
                                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                                        <CustomerMenu close={handleCloseCustomerMenu} />
                                    </Menu>
                                </div>
                            }
                        </Box>
                    </Box>
                </Toolbar >
            </AppBar >
        </Box >
    );
}

export default Navbar;
