import { PrismaClient, Prisma } from '@prisma/client';
import { client } from "@/lib/hono";

const prisma = new PrismaClient();

const currencies: Prisma.CurrencyCreateInput[] = [
    {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        useRate: 1.17,
        isActive: true,
    },
    {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        useRate: 1.0,
        isActive: true,
    },
    {
        code: "BDT",
        name: "Bangladeshi Taka",
        symbol: "৳",
        useRate: 0.0082,
        isActive: true,
    },
    {
        code: "INR",
        name: "Indian Rupee",
        symbol: "₹",
        useRate: 0.011,
        isActive: true,
    }
];

const roles: Prisma.RoleCreateInput[] = [
    {
        name: "Admin",
    },
    {
        name: 'Player'
    },
    {
        name: 'Satff'
    },
    {
        name: "Super Admin"
    },
    {
        name: 'System Admin',
        permissions: {
            create: {
                resource: 'MANAGE_ROLE',
                actions: ['CREATE', 'READ', 'DELETE', 'UPDATE']
            }
        }
    }
];

const superAdminUser = {
    email: "superadmin@example.com",
    password: "password",
    name: "Super Admin",
}

const main = async () => {
    try {

        for (const currency of currencies) {
            await prisma.currency.upsert({
                where: { code: currency.code },
                update: {
                    name: currency.name,
                    symbol: currency.symbol,
                    useRate: currency.useRate,
                },
                create: {
                    code: currency.code,
                    name: currency.name,
                    symbol: currency.symbol,
                    useRate: currency.useRate,
                },
            })
            console.log(`✅ Upserted currency: ${currency.code}`)
        }

        for (const role of roles) {
            await prisma.role.upsert({
                where: { name: role.name },
                update: {},
                create: role,
            })
            console.log(`✅ Upserted role: ${role.name}`)
        }

        const role = await prisma.role.findUnique({
            where: { name: roles[3].name },
        })
        if (!role) {
            throw new Error("Super Admin role not found!")
        }
        await client.api.admin.users.$post({
            json: {
                email: superAdminUser.email,
                name: superAdminUser.name,
                password: superAdminUser.password,
                roleId: role.id,
                userType: 'SUPER_ADMIN'
            }
        })

        console.log(`✅ Super Admin user created: ${superAdminUser.email}`)

    } catch (error) {
        console.error("Error seed migration", error);
        process.exit(1);
    }
}

main();