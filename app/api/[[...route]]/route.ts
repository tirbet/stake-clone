import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import authRoute from './authRoute';
import userRoute from './userRoute';
import adminRoute from './adminRoute';
import sportRoute from './sportRoute';

const app = new Hono().basePath("/api");
const routes = app
  .route("/auth", authRoute)
  .route('/user', userRoute)
  .route('/admin', adminRoute)
  .route('/sports', sportRoute)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;