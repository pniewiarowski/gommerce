import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'radial-gradient-center-1': "url('/bg-radial-gradient-center-1.png')",
                'radial-gradient-center-2': "url('/bg-radial-gradient-center-2.png')",
                'radial-gradient-distracted-1': "url('/bg-radial-gradient-distracted-1.png')",
            },
            keyframes: {
                floating1: {
                    '0%': {transform: 'translateY(-0.33rem)'},
                    '50%': {transform: 'translateY(0.13rem)'},
                    '100%': {transform: 'translateY(-0.33rem)'},
                },
                floating2: {
                    '0%': {transform: 'translateY(-0.43rem)'},
                    '50%': {transform: 'translateY(0.03rem)'},
                    '100%': {transform: 'translateY(-0.43rem)'},
                },
            },
            animation: {
                'floating1': 'floating1 2s ease-in-out infinite',
                'floating2': 'floating2 3s ease-in-out infinite',
                'floating3': 'floating1 3s ease-in-out infinite'
            },
        },
    },
    plugins: [
        nextui({
            themes: {}
        }),
    ],
    darkMode: "class",
};

export default config;
