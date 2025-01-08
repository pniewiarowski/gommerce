import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input"
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeDefinition } from "gommerce-app-shared/api/definition";
import { useBackend } from "gommerce-app-shared/hook";
import { ResourceFormViewAction } from "../resource";
import { themeResolver, themeType } from "../../resolver";
import { PaperForm } from "../../atoms";
import { JwtContext } from "../../context";

interface Props {
    default?: ThemeDefinition | null
}

const ThemeForm = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<themeType>({ resolver: zodResolver(themeResolver) });
    const navigate = useNavigate();
    const [primaryColor, setPrimaryColor] = useState<string>(props.default ? props.default.primaryColor : "#651fff");
    const [secondaryColor, setSecondaryColor] = useState<string>(props.default ? props.default.secondaryColor : "#651fff");
    const [interfaceUIVariant, setInterfaceUIVariant] = useState<"mui" | "rounded" | "sharp">(
        props.default !== null && props.default !== undefined ? props.default.interfaceUIVariant : "mui"
    );
    const [interfaceButtonVariant, setInterfaceButtonVariant] = useState<"mui" | "rounded" | "sharp">(
        props.default !== null && props.default !== undefined ? props.default.interfaceButtonVariant : "mui"
    );
    const [interfaceInputVariant, setInterfaceInputVaraint] = useState<"mui" | "rounded" | "sharp">(
        props.default !== null && props.default !== undefined ? props.default.interfaceInputVariant : "mui"
    );
    const [userSpaceWidth, setUserSpaceWidth] = useState<number>(props.default !== null && props.default !== undefined ? props.default.userSpaceWidth : 75);
    const [errorColor, setErrorColor] = useState<string>(props.default ? props.default.errorColor : "#cf3245");
    const [successColor, setSuccessColor] = useState<string>(props.default ? props.default.successColor : "#32cf45");
    const [warningColor, setWariningColor] = useState<string>(props.default ? props.default.warningColor : "#cfaa11");
    const [themeMode, setThemeMode] = useState<"dark" | "light">(props.default ? props.default.mode : "light");
    const { jwt } = useContext(JwtContext);
    const { themeRepository } = useBackend();

    const onSubmit = async (data: themeType) => {
        const create = async () => {
            await themeRepository.create({
                title: data.title,
                mode: themeMode,
                userSpaceWidth: userSpaceWidth,
                applicationTitle: data.applicationTitle,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                errorColor: errorColor,
                successColor: successColor,
                warningColor: warningColor,
                interfaceUIVariant: interfaceUIVariant,
                interfaceButtonVariant: interfaceButtonVariant,
                interfaceInputVariant: interfaceInputVariant,
            }, jwt);
            navigate('/cms/theme')
        }

        const update = async () => {
            await themeRepository.update({
                id: props.default.id,
                title: data.title,
                mode: themeMode,
                applicationTitle: data.applicationTitle,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                errorColor: errorColor,
                successColor: successColor,
                warningColor: warningColor,
                interfaceUIVariant: interfaceUIVariant,
                interfaceButtonVariant: interfaceButtonVariant,
                interfaceInputVariant: interfaceInputVariant,
                userSpaceWidth: userSpaceWidth,
            }, jwt);
            navigate('/cms/theme')
        }

        !props.default && create();
        props.default && update();
    };

    const buildMarksForWidthSlider = () => {
        const marks = [];
        for (let i = 65; i <= 100; i += 5) {
            marks.push({
                value: i,
                label: `${i}%`,
            });
        }

        return marks;
    }

    return (
        <PaperForm onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ mb: 2, fontSize: "2rem" }}>Base</Typography>
                <FormControl sx={{ mb: 1, mr: 1, width: "49.5%" }} fullWidth>
                    <TextField
                        label="title"
                        variant="outlined"
                        {...register("title")}
                        error={!!errors.title}
                        defaultValue={props.default ? props.default.title : ""}
                        helperText={errors.title ? errors.title.message : ""}
                    />
                </FormControl>
                <FormControl sx={{ mb: 1, width: "50%" }} fullWidth>
                    <TextField
                        label="application title"
                        variant="outlined"
                        {...register("applicationTitle")}
                        error={!!errors.applicationTitle}
                        defaultValue={props.default ? props.default.applicationTitle : ""}
                        helperText={errors.applicationTitle ? errors.applicationTitle.message : ""}
                    />
                </FormControl>
                <FormControl sx={{ mb: 1, width: "100%" }} fullWidth>
                    <Select defaultValue={props.default ? props.default.mode : "light"} onChange={(event) => setThemeMode(event.target.value as "dark" | "light")}>
                        <MenuItem value={"light"}>Light</MenuItem>
                        <MenuItem value={"dark"}>Dark</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: "100%", p: 1 }} fullWidth>
                    <Typography sx={{ zIndex: "5", }}>Application container with</Typography>
                    <Slider min={65} max={100} value={userSpaceWidth} marks={buildMarksForWidthSlider()} onChange={(e) => { setUserSpaceWidth(e.target.value) }} />
                </FormControl>
            </Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ mb: 1, fontSize: "2rem" }}>Pallete</Typography>
                <FormControl sx={{ mb: 1, mr: 1, width: "15%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Primary Color</Typography>
                    <MuiColorInput format="hex" value={primaryColor} onChange={(value) => setPrimaryColor(value)} />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, width: "15%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Secondary Color</Typography>
                    <MuiColorInput format="hex" value={secondaryColor} onChange={(value) => setSecondaryColor(value)} />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, width: "15%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Error Color</Typography>
                    <MuiColorInput format="hex" value={errorColor} onChange={(value) => setErrorColor(value)} />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, width: "15%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Success Color</Typography>
                    <MuiColorInput format="hex" value={successColor} onChange={(value) => setSuccessColor(value)} />
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, width: "15%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Warning Color</Typography>
                    <MuiColorInput format="hex" value={warningColor} onChange={(value) => setWariningColor(value)} />
                </FormControl>
            </Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ mb: 1, fontSize: "2rem" }}>Interface</Typography>
                <FormControl sx={{ mb: 1, mr: 1, width: "10%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>UI</Typography>
                    <Select defaultValue={interfaceUIVariant} onChange={(event) => setInterfaceUIVariant(event.target.value as "mui" | "rouneded" | "sharp")}>
                        <MenuItem value={"mui"}>MUI</MenuItem>
                        <MenuItem value={"rounded"}>Rounded</MenuItem>
                        <MenuItem value={"sharp"}>Sharp</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, width: "10%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Button</Typography>
                    <Select defaultValue={interfaceButtonVariant} onChange={(event) => setInterfaceButtonVariant(event.target.value as "mui" | "rounded" | "sharp")}>
                        <MenuItem value={"mui"}>MUI</MenuItem>
                        <MenuItem value={"rounded"}>Rounded</MenuItem>
                        <MenuItem value={"sharp"}>Sharp</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ mb: 1, mr: 1, width: "10%" }} fullWidth>
                    <Typography sx={{ zIndex: "5" }}>Input</Typography>
                    <Select defaultValue={interfaceInputVariant} onChange={(event) => setInterfaceInputVaraint(event.target.value as "mui" | "rouneded" | "sharp")}>
                        <MenuItem value={"mui"}>MUI</MenuItem>
                        <MenuItem value={"rounded"}>Rounded</MenuItem>
                        <MenuItem value={"sharp"}>Sharp</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ mb: 1, fontSize: "2rem" }}>Typography</Typography>
            </Box>
            <FormControl sx={{ mt: 1, display: "flex", flexDirection: "row" }} fullWidth>
                <ResourceFormViewAction backLink={"/cms/theme"} type={props.default ? "save" : "create"} />
            </FormControl>
        </PaperForm >
    );
}

export default ThemeForm;
