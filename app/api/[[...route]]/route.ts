import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import authRoute from './authRoute'
import { corsMiddleware, authMiddleware } from '@/utils/custom';
const app = new Hono().basePath('/api')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .use("*", corsMiddleware)
  .route("/auth", authRoute)
  .get('/hello', (c) => {
    return c.json({ test: "test" })
  })
  .get("/session", authMiddleware, (c) => {
    const session = c.get("session")
    const user = c.get("user")
    return c.json({
      session,
      user
    });
  });

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;