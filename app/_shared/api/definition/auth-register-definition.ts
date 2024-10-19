interface AuthRegisterDefinition {
    id: number,
    email: string,
    enable: boolean,
    roleID: number,
    token: string,
    userID: number,
    isAdmin: boolean,
}

export default AuthRegisterDefinition;
