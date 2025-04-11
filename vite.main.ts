import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    const isProd = mode === "production";

    return {
        build: {
            emptyOutDir: false,
            minify: isProd,
            rollupOptions: {
                input: {
                    main: "./main/index.ts",
                },
                output: {
                    dir: "./dist",
                    entryFileNames: "[name].js",
                },
                external: [
                    "fs",
                    "util",
                    "os",
                    "path",
                    "http",
                    "zlib",
                    "events",
                    "stream",
                    "https",
                    "crypto",
                    "electron",
                    "mupdf",
                    "winston",
                    "winston-daily-rotate-file",
                ],
            },
        },
    };
});
