import { PrismaClient, Prisma } from '@/prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import { auth } from '@/lib/auth';
import { SystemRole } from '@/lib/constants/roles';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({
    log: ['error', 'info', 'query', 'warn'],
    adapter
})

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



const superAdminUser = {
    email: "superadmin@example.com",
    password: "password",
    name: "Super Admin",
}


const main = async () => {
    try {

        console.log("🔌 Testing database connection...");
        await prisma.$connect();
        console.log("✅ Database connected successfully!");

        console.log("🗑 Clearing existing database data...");

        // Clear data in correct order (respecting foreign key constraints)
        await prisma.configuration.deleteMany();
        console.log("✅ Configurations cleared");

        await prisma.user.deleteMany();
        console.log("✅ Users cleared");


        await prisma.currency.deleteMany();
        console.log("✅ Currencies cleared");

        console.log("✨ Database cleared!");

        // Create currencies
        console.log("💰 Creating currencies...");
        for (const currency of currencies) {
            await prisma.currency.create({ data: currency });
            console.log(`✅ Created currency: ${currency.code}`);
        }

        // Create configuration
        console.log("⚙️ Creating configuration...");
        await prisma.configuration.create({
            data: {
                type: 'Sports',
                isActive: true,
                value: [1, 4, 3, 2, 6, 29, 10, 66, 13, 40, 28, 16, 278, 5, 25, 36, 9, 21, 308, 216, 67, 26, 14, 80, 41, 68, 151, 8, 44, 132, 126, 48, 82, 56, 31, 18, 49, 202, 314, 307, 281, 7, 30, 87, 102, 69, 92, 133, 20, 189, 17, 22, 19, 23, 24, 138, 180, 287]
            }
        });
        console.log("✅ Configuration created");


        const currency = await prisma.currency.findFirst();

        if (!currency) {
            throw new Error("Super Admin role not found!")
        }
        await auth.api.createUser({
            body: {
                email: superAdminUser.email,
                password: superAdminUser.password,
                name: superAdminUser.name,
                role: SystemRole.ULTIMATE_BENEFICIAL_OWNER
            }
        })


        console.log(`✅ Super Admin user created: ${superAdminUser.email}`)

    } catch (error) {
        console.error("Error seed migration", error);
        process.exit(1);
    }
}

main();