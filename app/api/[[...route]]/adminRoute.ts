import { Hono } from 'hono';
import roleRoute from "./admin/role.route";
import userRoute from './admin/user.route';
import currencyRoute from './admin/currency.rote';

const app = new Hono({ strict: false })
    .route('/role', roleRoute)
    .route('/users', userRoute)
    .route('/currency', currencyRoute)
export default app;