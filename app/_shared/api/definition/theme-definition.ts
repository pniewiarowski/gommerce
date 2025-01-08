interface ThemeDefinition {
    id?: number,
    title: string,
    mode: "light" | "dark",
    userSpaceWidth: number,
    applicationTitle: string,
    primaryColor: string,
    secondaryColor: string,
    errorColor: string,
    successColor: string,
    warningColor: string,
    interfaceUIVariant: "mui" | "rounded" | "sharp",
    interfaceButtonVariant: "mui" | "rounded" | "sharp",
    interfaceInputVariant: "mui" | "rounded" | "sharp",
}

export default ThemeDefinition;
