import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import configRoute from './configRoute';
import authRoute from './authRoute';
import userRoute from './userRoute';
import adminRoute from './adminRoute';

const app = new Hono().basePath("/api");
const routes = app
  .route("/config", configRoute)
  .route("/auth", authRoute)
  .route('/user', userRoute)
  .route('/admin', adminRoute)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;