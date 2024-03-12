"use client";

import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import "../globals.css";

interface Props {
    children: React.ReactNode
}

function RootLayout({children}: Props): React.JSX.Element {
    return (
        <html>
        <body>
        <NextUIProvider>
            <main className={"min-h-lvh dark"}>
                {children}
            </main>
        </NextUIProvider>
        </body>
        </html>
    );
}

export default RootLayout;
