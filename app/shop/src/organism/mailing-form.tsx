import React, { useContext, useState } from "react";
import { Button, FormControl, Grid, Paper, TextField, Theme, Typography, useTheme } from "@mui/material";
import { UserContext } from "../context";

const MailingForm = (): React.JSX.Element => {
    const theme: Theme = useTheme();
    const { user } = useContext(UserContext);
    const [inputEmail, setInputEmail] = useState(user !== null ? user.email : "");

    return (
        <React.Fragment>
            <Grid item xl={6} xs={12}>
                <Paper sx={{ width: "100%", height: "200px", p: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h4">keep in touch and sign into our <span style={{ color: theme.palette.primary.main }}>mailing</span> service</Typography>
                </Paper>
            </Grid>
            <Grid item xl={6} xs={12}>
                <Paper elevation={3} sx={{ width: "100%", height: "100%", p: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <form style={{ width: "100%" }}>
                        <FormControl style={{ width: "70%" }}>
                            <TextField label="enter your email" value={inputEmail} onChange={(event) => setInputEmail(event.target.value)} />
                        </FormControl>
                        <FormControl style={{ width: "30%" }}>
                            <Button color="primary" variant="contained" sx={{ ml: "1.25rem", p: "1rem 2.25rem" }}>sign me</Button>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default MailingForm;
