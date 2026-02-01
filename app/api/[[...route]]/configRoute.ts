import { Hono } from 'hono';
import { config } from '@/lib/navigation';
import { auth } from '@/lib/auth';

const app = new Hono({ strict: false })
    .get('/',
        async (c) => {
            const authUser = await auth.api.getSession({ headers: c.req.raw.headers });         
            const data = await config(authUser?.user)
            return c.json({ data })
        })

export default app;