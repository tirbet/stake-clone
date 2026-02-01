import { z } from "zod";

export const smtpSchema = z.object({
    host: z.string().min(1, "host_is_required"),
    port: z.coerce.number().positive(),
    secure:  z.boolean(),
    username: z.string().min(1, "username_is_required"),
    password: z.string().min(1, "password_is_required"),
    fromEmail: z.string().min(1, "from_email_is_required"),
    fromName: z.string().optional(),
});

export type SMTPSchema = z.infer<typeof smtpSchema>;