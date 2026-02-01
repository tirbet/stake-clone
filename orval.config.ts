import { defineConfig } from "orval";

export default defineConfig({
    tirbet: {
        input: {
            target: "https://api.tirbet.online/doc",
            converterOptions: {
                version: "3.0.0",
            },
        },
        output: {
            target: "sdk/index.ts",
            baseUrl: "https://api.tirbet.online",
            schemas: "sdk/model",
            client: "fetch",
            mode: "tags",
            clean: true,

        },
    },
});
