import prisma from '@/lib/prisma';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { currencySchema, currencyIdSchema, updateCurrencySchema } from '@/schemas/currency.schema';
import { Permission } from '@/middleware/permission.middleware';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const app = new Hono({ strict: false })
    .post('/',
        Permission([{
            resource: 'currency',
            actions: ['CREATE']
        }]),
        zValidator('json', currencySchema),
        async (c) => {

            const { name, code, decimals, isActive, useRate, symbol } = c.req.valid("json");
            const existing = await prisma.currency.findFirst({
                where: { code }
            });

            if (existing) {
                return c.json({ message: "Currency already exists" }, 422);
            }
            const currency = await prisma.currency.create({
                data: {
                    name,
                    code,
                    decimals,
                    isActive,
                    useRate,
                    symbol
                }
            })
            return c.json({ currency, message: 'Currency created' })

        })
    .get('/',
        Permission([{
            resource: 'currency',
            actions: ['READ']
        }]),
        async (c) => {
            const currencies = await prisma.currency.findMany();
            const h = c.req.raw.headers; // or: const h = c.req.raw.headers;
            // Ask Better Auth if this user can CREATE / UPDATE / DELETE currency
            const [{ success: canCreate }, { success: canUpdate }, { success: canDelete }] =
                await Promise.all([
                    auth.api.userHasPermission({
                        body: {
                            permissions: {
                                currency: ["CREATE"],
                            },
                        },
                        headers: h,
                    }),
                    auth.api.userHasPermission({
                        body: {
                            permissions: {
                                currency: ["UPDATE"],
                            },
                        },
                        headers: h,
                    }),
                    auth.api.userHasPermission({
                        body: {
                            permissions: {
                                currency: ["DELETE"],
                            },
                        },
                        headers: h,
                    }),
                ]);

            return c.json(
                {
                    currencies,
                    permissions: {
                        canCreate,
                        canUpdate,
                        canDelete,
                    },
                });
        }
    )
    .get(
        '/:id',
        Permission([{
            resource: 'currency',
            actions: ['READ']
        }]),
        zValidator('param', currencyIdSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const currency = await prisma.currency.findUnique({
                where: { id },
            });
            if (!currency) return c.json({ message: "Currency not found" }, 422);
            return c.json({ currency });
        }
    )
    .put(
        '/:id',
        Permission([{
            resource: 'currency',
            actions: ['UPDATE']
        }]),
        zValidator('param', currencyIdSchema),
        zValidator('json', updateCurrencySchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const data = c.req.valid("json");
            const currency = await prisma.currency.update({
                where: { id },
                data,
            });
            return c.json({ currency });
        }
    )
    .delete(
        '/:id',
        Permission([{
            resource: 'currency',
            actions: ['DELETE']
        }]),
        zValidator('param', currencyIdSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            await prisma.currency.delete({ where: { id } });
            return c.json({ message: "Currency deleted successfully" });
        }
    );
export default app;