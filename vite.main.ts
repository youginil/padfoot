import { defineConfig } from "vite";

export default defineConfig({
    build: {
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: "./main/index.ts",
            },
            output: {
                dir: "./dist",
                entryFileNames: "[name].cjs",
                format: "cjs",
            },
            external: ["electron"],
        },
    },
});
