import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
    server: {
        allowedHosts: true,
    },
    plugins: [
        tanstackStart(),
        react(),
        tailwindcss(),
        imagetools(),
    ],
    resolve: {
        alias: {
            "@": import.meta.dirname + "/src",
        },
    },
});

