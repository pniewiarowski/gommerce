import { useContext, useEffect, useState } from "react";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useBackend } from "gommerce-app-shared/hook";
import { SettingDefinition, ThemeDefinition } from "gommerce-app-shared/api/definition";
import { ResourceFormViewAction } from "../resource";
import { JwtContext } from "../../context";
import { PaperForm } from "../../atoms";

const AdminSettingForm = () => {
    const { jwt } = useContext(JwtContext);
    const { themeRepository, settingRepository } = useBackend();
    const [themes, setThemes] = useState<Array<ThemeDefinition>>([]);
    const [settings, setSettings] = useState<Array<SettingDefinition>>([]);
    const [selectedTheme, setSelectedTheme] = useState<number>();
    const [loading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        (async () => {
            setThemes(await themeRepository.get(jwt));
            setSettings(await settingRepository.get());
            setSelectedTheme(Number((await settingRepository.getByID(3)).value));
            setIsLoading(false);
        })();
    }, []);

    if (loading) {
        return;
    }

    /**
     * TODO: Make generic settings after presentation.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        (async () => {
            const setting = settingRepository.getByID(3);

            (await setting).value = String(selectedTheme);
            settingRepository.update(await setting, jwt);
        })();
    }


    return (
        <PaperForm onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>Project Theme</Typography>
                <Select defaultValue={selectedTheme} onChange={(event) => setSelectedTheme(event.target.value as number)}>
                    {themes.map((theme) =>
                        <MenuItem value={theme.id}>{theme.title}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <ResourceFormViewAction backLink={"/"} type={"setting"} />
        </PaperForm>
    );
}

export default AdminSettingForm;
