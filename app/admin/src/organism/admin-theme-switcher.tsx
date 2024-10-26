import { Dispatch, SetStateAction, useEffect } from "react";
import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useCookies } from "gommerce-app-shared/hook";

interface Props {
    setTheme: Dispatch<SetStateAction<string>>;
    theme: string;
}

const AdminThemeSwitcher = (props: Props) => {
    const { set, get } = useCookies();

    const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        const themeValue = event.target.checked ? "dark" : "light";

        props.setTheme(themeValue);
        set("gommerce-admin-panel-theme", themeValue);
    };

    return (
        <Box sx={{ position: "absolute", right: "5px", top: "7px" }}>
            <FormGroup>
                <FormControlLabel control={<Switch onChange={handleChangeTheme} checked={props.theme === "dark"} />} label={props.theme === "dark" ? "Dark" : "Light"} />
            </FormGroup>
        </Box>
    );
}

export default AdminThemeSwitcher;