"use client";

import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {Navbar} from "@/organism";
import "material-icons/iconfont/material-icons.css";
import "../globals.css";

interface Props {
    children: React.ReactNode
}

function RootLayout({children}: Props): React.JSX.Element {
    return (
        <html>
        <body>
        <NextUIProvider>
            <main className={"min-h-lvh light text-foreground bg-background"}>
                <Navbar heading={"gommerce"} categories={[{ID: 1, Name: "Hoodies"}, {ID: 2, Name: "Shoes"}, {ID: 3, Name: "Watches"}]}/>
                {children}
            </main>
        </NextUIProvider>
        </body>
        </html>
    );
}

export default RootLayout;
