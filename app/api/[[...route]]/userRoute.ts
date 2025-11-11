import prisma from '@/lib/prisma';
import { authMiddleware } from '@/middleware/auth.middleware';
import { Hono } from 'hono';
const app = new Hono({ strict: false })
    .use('*', authMiddleware)
    .get('/', async (c) => {
        const { id } = c.get('user');
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                wallets: {
                    select: {
                        id: true,
                        balance: true,
                        isActive: true,
                        isBonus: true,
                        isFrozen: true,
                        currency: {
                            select: {
                                id: true,
                                code: true,
                                name: true,
                                symbol: true

                            }
                        }
                    }
                },
                userType: true,
                role: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                actions: true,
                                resource: true
                            }
                        }
                    }
                }
            }
        });
        return c.json({ user: user! })

    })

export default app;