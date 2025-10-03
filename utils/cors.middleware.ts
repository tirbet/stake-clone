import { cors } from 'hono/cors';

export const corsMiddleware = cors({
    origin: process.env.NEXT_PUBLIC_APP_URL!,
    allowHeaders: [
        "Content-Type",
        "Authorization",
        "Cookie",
        "Accept",
        "Content-Disposition",
    ],
    allowMethods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
});
