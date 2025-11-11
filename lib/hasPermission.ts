// /lib/hasPermission.ts
import type { PermissionAction, PermissionResource } from "@/schemas/permission.schema";

export function hasPermission(
  permissions: { resource: PermissionResource; actions: PermissionAction[] }[],
  resource?: PermissionResource
): boolean {
  // No resource required = always allowed
  if (!resource) return true;

  // Check if user has at least VIEW permission for the resource
  return permissions.some(
    (perm) => perm.resource === resource && perm.actions.length > 0
  );
}
