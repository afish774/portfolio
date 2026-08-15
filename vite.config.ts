import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    server: {
        allowedHosts: [
            "9d470975-ca12-4c34-95e3-70fccaf7e8a5-00-21yyy0sfxb1cf.sisko.replit.dev",
        ],
    },
    plugins: [
        tanstackStart(),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": import.meta.dirname + "/src",
        },
    },
});

