// /middleware/permission.middleware.ts
import type { Context, Next } from "hono";
import { auth } from "@/lib/auth"; // your better-auth instance
import { TableOperation } from "@/lib/constants/permissions"
import { getSession } from "@/lib/get-session";
type PermissionRule = {
    resource: string;      // e.g. "Currency"
    actions: TableOperation[];     // e.g. ["CREATE", "READ"]
};

// Wrapper: use like Permission([{ resource: "Currency", actions: ["CREATE"] }])
export const Permission = (rules: PermissionRule[]) => {
    return async (c: Context, next: Next) => {
        // 1) Get session (Hono integration pattern)
        const { session, user } = await getSession();

        if (!session || !user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        const role = user.role;
        const userId = user.id;

        if (!role) {
            return c.json({ message: "Forbidden" }, 403);
        }

        // 2) Build permissions object for Better Auth access control
        const permissions = rules.reduce<Record<string, string[]>>((acc, rule) => {
            acc[rule.resource] = rule.actions;
            return acc;
        }, {});

        // 3) Ask Better Auth if this role has those permissions
        //    You can pass either `role` OR `userId` (or both). Here we use role.
        const result = await auth.api.userHasPermission({
            body: {
                userId,
                permissions,
            },
        });

        // Better Auth returns { success: boolean, error?: ..., data?: ... }
        if (!result.success) {
            return c.json({ message: "Forbidden" }, 403);
        }

        // 4) All good → continue to handler
        return next();
    };
};
