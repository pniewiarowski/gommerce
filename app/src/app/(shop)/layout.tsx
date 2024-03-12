"use client";

import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {Navbar} from "@/organism";
import "material-icons/iconfont/material-icons.css";
import "../globals.css";
import {randomFromArray} from "@/util";

interface Props {
    children: React.ReactNode
}

function RootLayout({children}: Props): React.JSX.Element {
    const backgrounds: Array<string> = [
        "bg-radial-gradient-center-1",
        "bg-radial-gradient-center-2",
        "bg-radial-gradient-distracted-1",
    ];

    const mode: string = "dark";

    return (
        <html>
        <body className={"bg-purple-blue"}>
        <NextUIProvider>
            <main className={`min-h-lvh text-foreground ${mode} ${randomFromArray(backgrounds)} bg-background bg-no-repeat`}>
                <Navbar heading={"gommerce"}
                        categories={[{ID: 1, Name: "Hoodies"}, {ID: 2, Name: "Shoes"}, {ID: 3, Name: "Watches"}]}/>
                {children}
            </main>
        </NextUIProvider>
        </body>
        </html>
    );
}

export default RootLayout;
