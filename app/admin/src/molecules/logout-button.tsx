import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"
import { useCookies } from "gommerce-app-shared/hook";
import { JwtContext, UserContext } from "../context";

const LogoutButton = () => {
    const { setUser } = useContext(UserContext);
    const { setJwt } = useContext(JwtContext);
    const navigate = useNavigate();
    const { clear } = useCookies();

    return (
        <Button
            color="error"
            variant="outlined"
            onClick={() => {
                setUser(null);
                setJwt(null);
                clear();
                navigate("/login");
            }}
            sx={{ zIndex: 100, position: "absolute", width: 430, p: 2, bottom: 20, left: 20 }}
        >Exit</Button>
    )
}

export default LogoutButton;
