import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ThemeDefinition } from "gommerce-app-shared/api/definition";

const getRadius = (radiusOption: "mui" | "sharp" | "rounded", isUI: boolean = true) => {
    switch (radiusOption) {
        case "rounded":
            return isUI ? 100 : 20;
        case "sharp":
            return 0;
        default:
            return 4;
    }
}

const createGommerceTheme = (options: ThemeDefinition): ThemeOptions => {
    const extraComponents = {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: getRadius(options.interfaceUIVariant, false),
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: getRadius(options.interfaceUIVariant, false),
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: getRadius(options.interfaceInputVariant),
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    fontWeight: 900,
                    lineHeight: 1.4,
                    letterSpacing: 0,
                    padding: "",
                    borderRadius: getRadius(options.interfaceButtonVariant),
                },
            },
        },
    };

    if (options.mode === "dark") {
        return createTheme({
            palette: {
                mode: "dark",
                primary: {
                    main: options.primaryColor,
                },
                secondary: {
                    main: options.secondaryColor,
                },
            },
            typography: {
                h3: {
                    fontWeight: 900,
                    fontFamily: "Roboto",
                    fontSize: 20,
                },
                h4: {
                    fontWeight: 700,
                    fontFamily: "Roboto",
                    fontSize: 14,
                },
            },
            components: {
                ...extraComponents
            }
        });
    };

    return createTheme({
        palette: {
            mode: "light",
            background: {
                default: `${options.primaryColor}77`,
            },
            primary: {
                main: options.primaryColor,
            },
            secondary: {
                main: options.secondaryColor,
            },
        },
        typography: {
            h3: {
                fontWeight: 900,
                fontFamily: "Roboto",
                fontSize: 20,
            },
            h4: {
                fontWeight: 700,
                fontFamily: "Roboto",
                fontSize: 14,
            },
        },

        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: "#ffffff"
                    }
                }
            },
            ...extraComponents,
        },
    });
}

export default createGommerceTheme;
