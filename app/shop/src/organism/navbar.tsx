import React, { useEffect, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    ListItem,
    List,
    ListItemButton,
    Paper,
} from "@mui/material";
import { Person, ShoppingBag, Settings, Logout, Bookmark, Close } from "@mui/icons-material";
import { CategoryDefinition } from "gommerce-app-shared/api/definition";
import { CustomerContext, ShopBagContext } from "../context";
import { stringAvatar } from "../util";
import { useCookies } from "../../../_shared/hook";

interface Props {
    heading: string,
    elevation?: number,
    width: string,
    categories: Array<CategoryDefinition>
}

const Navbar = (props: Props): React.JSX.Element => {
    const [anchorElCustomerMenu, setAnchorElCustomerMenu] = React.useState<null | HTMLElement>(null);
    const [anchorElShoppingBag, setAnchorElShoppingBag] = React.useState<null | HTMLElement>(null);
    const { customer, setCustomer } = useContext(CustomerContext);
    const { shopBag, setShopBag } = useContext(ShopBagContext);
    const { clear } = useCookies();
    const navigate = useNavigate();
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

    const logout = () => {
        clear();
        setCustomer(null);
        navigate('/login');
    }

    const categoriesToRender: Array<React.JSX.Element> = props.categories.map((category: CategoryDefinition, i: number) => {
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
                        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to="/">
                                <Typography variant="h3" color="secondary" component="div" sx={{ ml: 1.25, flexGrow: 1 }}>
                                    {props.heading}
                                </Typography>
                            </Link>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            {categoriesToRender}
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} color="text.primary">
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
                                sx={{ transform: "translateX(-5%)" }}
                                onClose={handleCloseShoppingBag}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}>
                                <Fragment>
                                    <List sx={{ maxHeight: "400px", width: "344px", p: 2 }}>
                                        {shopBag.map((item) => {
                                            return (
                                                <Link onClick={handleCloseShoppingBag} to={`/product/${item.id}`}>
                                                    <Paper variant="outlined" sx={{ mb: 1, pb: 1, pt: 1, width: "100%" }}>
                                                        <ListItem>
                                                            <Typography>{item.name}</Typography>
                                                        </ListItem>
                                                    </Paper>
                                                </Link>
                                            );
                                        })}

                                        {shopBag.length !== 0 && <Link to={`/checkout`}>
                                            <Button sx={{ mt: 1, mb: 1, p: 2 }} fullWidth onClick={handleCloseShoppingBag}>go to checkout</Button>
                                        </Link>}

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

                                    <Menu id="customer-menu" anchorEl={anchorElCustomerMenu} open={openCustomerMenu} sx={{ transform: "translateX(-7%) translateY(1%)" }} onWheel={handleCloseCustomerMenu} onClose={handleCloseCustomerMenu} MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>
                                        <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={handleCloseCustomerMenu}>
                                            <ShoppingBag sx={{ mr: 1 }} />
                                            <Typography>My orders</Typography>
                                        </MenuItem>
                                        <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={handleCloseCustomerMenu}>
                                            <Bookmark sx={{ mr: 1 }} />
                                            <Typography>Following items</Typography>
                                        </MenuItem>
                                        <Link to="/settings">
                                            <MenuItem sx={{ ml: 1, mr: 1, mb: 1, p: 1 }} onClick={handleCloseCustomerMenu}>
                                                <Settings sx={{ mr: 1 }} />
                                                <Typography>Settings</Typography>
                                            </MenuItem>
                                        </Link>
                                        <MenuItem sx={{ ml: 1, mr: 1, p: 1 }} onClick={handleCloseCustomerMenu}>
                                            <Close sx={{ mr: 1 }} />
                                            <Typography>Close</Typography>
                                        </MenuItem>
                                        <MenuItem sx={{ ml: 1, mr: 1, p: 1 }} onClick={logout}>
                                            <Logout sx={{ mr: 1 }} />
                                            <Typography>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            }
                            {!customer &&
                                <Link to={"/login"}>
                                    <Button sx={{ ml: 4 }} variant="outlined" color="secondary">login</Button>
                                </Link>
                            }
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
