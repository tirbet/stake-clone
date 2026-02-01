import prisma from "@/lib/prisma";
import { smtpSchema, SMTPSchema } from "@/schemas/configuration.schema";

export async function getActiveSmtp(): Promise<SMTPSchema> {
    const smtp = await prisma.configuration.findFirst({
        where: { type: "Smtp", isActive: true },
    });

    if (!smtp) {
        throw new Error("No active SMTP configuration found");
    }
    
    const parsed = smtpSchema.safeParse(smtp.value);

    if (!parsed.success) {
        console.error(parsed.error.flatten());
        throw new Error("Invalid SMTP configuration format");
    }

    return parsed.data;
}
