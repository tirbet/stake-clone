import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { PermissionResource, PermissionAction } from '@/schemas/permission.schema';
import type { HonoEnv } from '@/types/auth';
import {  UserType } from '@prisma/client/edge';
import { createMiddleware } from 'hono/factory';

export type RequiredPermission = {
    resource: PermissionResource;
    actions: PermissionAction[];
};

/**
 * Middleware to check if a user has at least one of the required permissions
 */
export const Permission = (routePermissions: RequiredPermission[]) => {
    return createMiddleware<HonoEnv>(async (c, next) => {
        // Get session
        const data = await auth.api.getSession({ headers: c.req.raw.headers });
        if (!data) {
            return c.json({ error: "Unauthorized" }, 401);
        }
        const { user, session } = data;
        c.set("user", user);
        c.set("session", session);
        if (user.userType === UserType.ADMIN || user.userType === UserType.SUPER_ADMIN) {
            return next();
        }

        if (!user.roleId) return c.json({ message: "You haven't any Role" }, 403)

        // Fetch user with role and permissions
        const userPermissions = await prisma.permission.findMany({
            where: { roleId: user.roleId },
            select: {
                resource: true,
                actions: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!user) return c.json({ error: "Unauthorized" }, 401);
       

        // Create a map for easier permission lookup
        const userPermsMap = createPermissionsMap(userPermissions);

        // Check if user has any of the required permissions
        const hasPermissions = checkAnyPermission(routePermissions, userPermsMap);


        if (!hasPermissions) {
            return c.json({ message: "Permission denied" }, 403);
        }

        return next();
    });
};

/**
 * Converts an array of permissions to a Map for easy lookup
 */
const createPermissionsMap = (
    userPermissions: { resource: string; actions: PermissionAction[] }[]
): Map<string, PermissionAction[]> => {
    return new Map(
        userPermissions?.map(permission => [
            permission.resource,
            permission.actions || [],
        ]) ?? []
    );
};

/**
 * Checks if at least one required permission is satisfied
 */
const checkAnyPermission = (
    requiredPermissions: RequiredPermission[],
    userPermsMap: Map<string, PermissionAction[]>
): boolean => {
    return requiredPermissions.some(requiredPerm =>
        isPermissionSatisfied(requiredPerm, userPermsMap)
    );
};

/**
 * Checks if a single permission is satisfied
 */
const isPermissionSatisfied = (
    requiredPerm: RequiredPermission,
    userPermsMap: Map<string, PermissionAction[]>
): boolean => {
    const userActions = userPermsMap.get(requiredPerm.resource);
    if (!userActions?.length) return false;

    // Return true if user has at least one of the required actions
    return requiredPerm.actions.some(action => userActions.includes(action));
};
