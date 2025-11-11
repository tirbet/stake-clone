import { z } from "zod";
import { permissionResource, permissionAction } from "./permission.schema";

export const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  permissions: z.array(z.object({
    resource: permissionResource,
    actions: z.array(permissionAction).nonempty("At least one action is required"),
  })).optional(),
});

export const roleIdSchema = z.object({
  id: z.uuid("Invalid role ID"),
});

// If you need TS types from them:
export type RoleSchema = z.infer<typeof roleSchema>;
export type RoleIdSchema = z.infer<typeof roleIdSchema>;
