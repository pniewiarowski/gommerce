import { Container, Typography } from "@mui/material";
import { ShoppingBag, CardGiftcard, Person, Settings } from "@mui/icons-material";
import { Animated3DBlock, Animated3DBlockIcon } from "../molecules";

const AdminLoginPageAnimation = () => {
    return (
        <Container sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Animated3DBlock>
                <Animated3DBlockIcon>
                    <ShoppingBag sx={{ fontSize: 128 }} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <CardGiftcard sx={{ fontSize: 128 }} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <img src="mui-logo.png" width={128} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <img src="postgresql-logo.png" width={128} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <Typography color={"text"} sx={{ fontSize: 32, fontWeight: "bold" }}>GOMMERCE</Typography>
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <img src="dotnet-logo.png" width={128} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <img src="go-logo.png" width={128} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <img src="docker-logo.png" width={128} />
                </Animated3DBlockIcon>
                <Animated3DBlockIcon>
                    <img src="react-logo.png" width={128} />
                </Animated3DBlockIcon>
            </Animated3DBlock>
        </Container>
    );
}

export default AdminLoginPageAnimation;
