import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { FooterColumn, FooterHeading, FooterItem } from "../molecule";

const Footer = (): React.JSX.Element => {
    return (
        <React.Fragment>
            <Grid item xs={12} md={6} xl={3}>
                <Paper sx={{ width: "100%", p: 4, display: "flex", justifyContent: "space-around" }} elevation={3}>
                    <FooterColumn>
                        <FooterHeading>Gommerce</FooterHeading>
                        <FooterItem link="/" content="your orders" />
                        <FooterItem link="/" content="your bag" />
                        <FooterItem link="/" content="promotions" />
                        <FooterItem link="/" content="about application" />
                    </FooterColumn>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
                <Paper sx={{ width: "100%", p: 4, display: "flex", justifyContent: "space-around" }} elevation={3}>
                    <FooterColumn>
                        <FooterHeading>Your account</FooterHeading>
                        <FooterItem link="/" content="my account" />
                        <FooterItem link="/" content="login" />
                        <FooterItem link="/" content="logout" />
                        <FooterItem link="/" content="settings" />
                    </FooterColumn>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
                <Paper sx={{ width: "100%", p: 4, display: "flex", justifyContent: "space-around" }} elevation={3}>
                    <FooterColumn>
                        <FooterHeading>Mailing Service</FooterHeading>
                        <FooterItem link="/" content="sign up" />
                        <FooterItem link="/" content="sign out" />
                        <FooterItem link="/" content="about mailing" />
                        <FooterItem link="/" content="benefits" />
                    </FooterColumn>
                </Paper>
            </Grid >
            <Grid item xs={12} md={6} xl={3}>
                <Paper sx={{ width: "100%", p: 4, display: "flex", justifyContent: "space-around" }} elevation={3}>
                    <FooterColumn>
                        <FooterHeading>Contact us</FooterHeading>
                        <FooterItem link="/" content="about us" />
                        <FooterItem link="/" content="mail us" />
                        <FooterItem link="/" content="phone" />
                        <FooterItem link="/" content="report error" />
                    </FooterColumn>
                </Paper>
            </Grid >
            <Grid item xs={12}>
                <Paper sx={{ width: "100%", p: 2 }}>
                    <Typography variant="h4">
                        System powstał na Wydziale Informatyki Politechniki Białostockiej
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ width: "100%", p: 2 }}>
                    <Typography variant="h4">
                        Copyright© 2024 pniewiarowski...anyway, I don't care.
                    </Typography>
                </Paper>
            </Grid>
        </React.Fragment >
    );
}

export default Footer;
