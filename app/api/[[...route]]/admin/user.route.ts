import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { updateUserSchema, userIdSchema, userSchema } from '@/schemas/user.schema';
import { zValidator } from '@hono/zod-validator';
import { Prisma, UserType } from '@prisma/client/edge';
import { Hono } from 'hono';
import z from 'zod';

const app = new Hono({ strict: false })
    .post(
        "/",
        zValidator("json", userSchema),
        async (c) => {
            try {
                const { email, name, password, roleId, userType, currencyId } = c.req.valid("json");

                const userExists = await prisma.user.findFirst({
                    where: { email }
                });
                console.log(userExists);
                if (userExists) {
                    return c.json({ message: "User alreay exists" }, 422);
                }

                // 1. Validate currency if provided
                if (currencyId) {
                    const currencyExists = await prisma.currency.findUnique({
                        where: { id: currencyId },
                        select: { id: true },
                    });
                    if (!currencyExists) {
                        return c.json({ message: "Currency not found" }, 422);
                    }
                }

                // 2. Create user in auth provider
                const {
                    user: { id: userId },
                } = await auth.api.signUpEmail({
                    body: { email, name, password },
                });

                // 3. Create wallet if needed
                if (currencyId) {
                    await prisma.wallet.create({
                        data: { userId, currencyId },
                    });
                }

                // 4. Update user with role + type
                const user = await prisma.user.update({
                    where: { id: userId },
                    data: { roleId, userType },
                    select: userSelect
                });
                return c.json({ user, message: "User created" });
            } catch (error) {
                console.error("Error creating user:", error);
                return c.json({ message: "Failed to create user" }, 500);
            }
        }
    )
    .get('/',
        zValidator("query", z.object({
            userType: z.enum(UserType).optional(),
            search: z.string().optional(),
            page: z.coerce.number().min(1).default(1),
            limit: z.coerce.number().min(1).max(100).default(10),
        })),
        async (c) => {
            const { userType, search, limit, page } = c.req.valid("query");

            const skip = (page - 1) * limit;

            const where: Prisma.UserWhereInput = {
                userType,
            };

            if (search) {
                where.OR = [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    {
                        role: {
                            OR: [
                                { name: { contains: search, mode: "insensitive" } },
                            ],
                        },
                    },
                ];
            }
            const [users, total] = await Promise.all([
                prisma.user.findMany({
                    where,
                    skip,
                    take: limit,
                    select: userSelect,
                }),
                prisma.user.count({ where }),
            ]);
            return c.json({
                users,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            });
        })
    .get('/:id',
        zValidator('param', userIdSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const user = await prisma.user.findUniqueOrThrow({
                where: { id },
                select: userSelect
            });
            return c.json({ user })
        }
    )
    .put(
        '/:id',
        zValidator('param', userIdSchema),
        zValidator('json', updateUserSchema.omit({
            password: true,
            currencyId: true
        })),
        async (c) => {
            const { id } = c.req.valid("param");
            const { email, name, roleId, userType } = c.req.valid("json");
            const user = await prisma.user.update({
                where: { id },
                data: {
                    email,
                    name,
                    roleId,
                    userType
                }
            });

            return c.json({ user });
        }
    )
    .delete('/:id',
        zValidator('param', userIdSchema),
        async (c) => {
            const { id } = c.req.valid('param');
            const user = await prisma.user.delete({ where: { id } });
            return c.json({ user, message: "User deleted" })
        }
    )
export default app;

const userSelect = {
    id: true,
    name: true,
    email: true,
    userType: true,
    roleId: true,
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
                    symbol: true,
                },
            },
        },
    },
    role: {
        select: {
            id: true,
            name: true,
            permissions: {
                select: {
                    resource: true,
                    actions: true,
                },
            },
        },
    },
}