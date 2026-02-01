import prisma from "@/lib/prisma";
import { PrismaClient, User } from "@/prisma/generated/prisma/client";

class UserService {
    constructor(private readonly db: PrismaClient) { }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return this.db.user.update({ where: { id }, data });
    }

    async deleteUser(id: string) {
        return this.db.user.delete({ where: { id } });
    }
}

export const userService = new UserService(prisma);