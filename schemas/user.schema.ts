import z from "zod";

export const userSchema = z.object({
  name: z.string(), 
  email: z.email(),
  password: z.string(),
  currency: z.uuid().optional(),
});

export const userIdSchema = z.object({
  id: z.string(), 
});
export type UserSchema = z.infer<typeof userSchema>;
export type UserIdSchema = z.infer<typeof userIdSchema>;
export const updateUserSchema = userSchema.partial();