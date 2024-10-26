import { Container, useTheme } from "@mui/material";
import { Animated3DBlock, Animated3DBlockIcon } from "../molecules";

const AdminLoginPageAnimation = () => {
    const theme = useTheme();

    return (
        <Container sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Animated3DBlock variant={theme.palette.mode}>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/mail.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/heart.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/hand-thumbsup.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/emoji-in-love.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/shopping-cart.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/money-bag.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/go-logo.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/emoji-angry.png" width={64} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon variant={theme.palette.mode}>
                    <img src="/administrator.png" width={64} />
                </Animated3DBlockIcon>
            </Animated3DBlock>
        </Container >
    );
}

export default AdminLoginPageAnimation;
