import { Hono } from 'hono';
import currencyRoute from './admin/currency.rote';

const app = new Hono({ strict: false })
    .route('/currency', currencyRoute)
export default app;