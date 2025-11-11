import prisma from '@/lib/prisma';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { roleSchema, roleIdSchema } from '@/schemas/role.schema';
import { Permission } from '@/middleware/permission.middleware';
import { PermissionResource } from '@/schemas/permission.schema';
const notEditOrDeleteAbleRoles = ['Admin', 'Super Admin',];
const app = new Hono({ strict: false })
    .post('/',
        Permission([{
            resource: 'Role',
            actions: ['CREATE']
        }]),
        zValidator('json', roleSchema),
        async (c) => {

            const { name, permissions } = c.req.valid("json");
            const existingRole = await prisma.role.findFirst({
                where: { name }
            });

            if (existingRole) {
                return c.json({ message: "Role already exists" }, 422);
            }
            const role = await prisma.role.create({
                data: { name }
            })

            if (permissions && permissions.length > 0) {
                await prisma.permission.createMany({
                    data: permissions.map(perm => ({
                        roleId: role.id,
                        resource: perm.resource,
                        actions: perm.actions,
                    }))
                });
            }
            return c.json({ role, message: 'Role created' })

        })
    .get('/',
        Permission([{
            resource: 'Role',
            actions: ['READ']
        }]),
        async (c) => {
            const roles = await prisma.role.findMany({
                select: {
                    id: true,
                    name: true,
                    permissions: {
                        select: {
                            resource: true,
                            actions: true,
                        }
                    }
                }
            });
            const result = roles.map((role) => ({
                ...role,
                permissions: role.permissions.map((p) => ({
                    ...p,
                    resource: p.resource as PermissionResource,
                })),
            }));
            return c.json({ roles: result });
        })
    .get(
        '/:id',
        Permission([{
            resource: 'Role',
            actions: ['READ']
        }]),
        zValidator('param', roleIdSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const role = await prisma.role.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    permissions: {
                        select: {
                            resource: true,
                            actions: true,
                        }
                    }
                }
            });

            if (!role) return c.json({ message: "Role not found" }, 404);
            const result = {
                ...role,
                permissions: role.permissions.map((p) => ({
                    ...p,
                    resource: p.resource as PermissionResource,
                })),
            }
            return c.json({ role: result });
        }
    )
    .put(
        '/:id',
        Permission([{
            resource: 'Role',
            actions: ['UPDATE']
        }]),
        zValidator('param', roleIdSchema),
        zValidator('json', roleSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const { name, permissions } = c.req.valid("json");


            // find if exies
            const exists = await prisma.role.findUnique({ where: { id } });
            if (!exists) return c.json({ message: 'Role not found' }, 422);


            if (notEditOrDeleteAbleRoles.includes(exists.name)) {
                return c.json(
                    { message: `The "${exists.name}" role cannot be modified.` },
                    403
                );
            }

            await prisma.role.update({
                where: { id },
                data: { name },
            });

            if (permissions) {
                // Remove all old permissions first
                await prisma.permission.deleteMany({
                    where: { roleId: id },
                });

                // Then re-insert the new ones if provided
                if (permissions.length > 0) {
                    for (const perm of permissions) {
                        await prisma.permission.create({
                            data: {
                                roleId: id,
                                resource: perm.resource,
                                actions: perm.actions,
                            },
                        });
                    }
                }
            }


            const roleWithPermissions = await prisma.role.findUnique({
                where: { id },
                include: { permissions: true },
            });
            return c.json({ role: roleWithPermissions, message: 'Role update' });
        }
    )
    .delete(
        '/:id',
        Permission([{
            resource: 'Role',
            actions: ['DELETE']
        }]),
        zValidator('param', roleIdSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const exists = await prisma.role.findUnique({ where: { id } });
            if (!exists) return c.json({ message: 'Role not found' }, 422);
            if (notEditOrDeleteAbleRoles.includes(exists.name)) {
                return c.json(
                    { message: `The "${exists.name}" role cannot be delete.` },
                    403
                );
            }
            await prisma.role.delete({ where: { id } });

            return c.json({ message: "Role deleted successfully" });
        }
    );
export default app;