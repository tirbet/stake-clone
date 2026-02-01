import { z } from "zod";

const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max 5MB")
    .refine(
        (file) => ["image/jpeg", "image/png"].includes(file.type),
        "Only JPG/PNG allowed"
    );

export const kycSchema = z.object({
    // Personal info
    firstName: z.string().min(1).max(255).optional(),
    lastName: z.string().min(1).max(255).optional(),
    birthDate: z.string().optional(), // or z.coerce.date() if you want real Date
    country: z.string().min(1).max(255).optional(),

    // ID info
    idType: z
        .enum(["PASSPORT", "DRIVER_LICENSE", "NATIONAL_ID"])
        .optional(), // maps to Prisma IdType
    idNumber: z.string().min(1).max(255).optional(),

    // File fields – these will usually be File objects in the browser
    // You can keep as z.any() and handle upload separately.
    idFrontPath: fileSchema.optional(),
    idBackPath: fileSchema.optional(),
    selfieWithIdPath: fileSchema.optional(),

    // Payment info
    paymentMethod: z
        .enum(["BANK_TRANSFER", "CREDIT_CARD"])
        .optional(), // maps to PaymentMethod enum if you add it to model later
    paymentProofPath: fileSchema.optional(),
    bankStatementPath: fileSchema.optional(),
});

export const kycIdSchema = z.object({
    label: z.coerce.number().positive()
});

export type KycSchema = z.infer<typeof kycSchema>;
export type KycIdSchema = z.infer<typeof kycIdSchema>;