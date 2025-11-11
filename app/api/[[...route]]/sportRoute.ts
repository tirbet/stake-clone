import { Hono } from 'hono';
import upcoming from './sport/upcoming';
import live from './sport/live';

const app = new Hono({strict: false})

.route('/upcoming', upcoming)
.route('/live', live)

export default app;