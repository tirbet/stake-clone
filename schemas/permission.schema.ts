import { z } from "zod";

export const permissionResource = z.enum(["Role", "Wallet", 'Currency']);

export const permissionAction = z.enum(["READ", "CREATE", "UPDATE", "DELETE"]);

export const permissionSchema = z.object({
  resource: permissionResource,
  actions: z
    .array(permissionAction)
    .nonempty("At least one action is required"),
  roleId: z.string().uuid("Invalid role ID"),
});

export type PermissionResource = z.infer<typeof permissionResource>;
export type PermissionAction = z.infer<typeof permissionAction>;
export type PermissionSchema = z.infer<typeof permissionSchema>;
