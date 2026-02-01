import { PrismaClient } from "@/prisma/generated/prisma/client";
import prisma from "@/lib/prisma"

type AddProps = {
    code: string
    userId: string
}

type UpdateProps = {
    id: string
    code?: string
    userId?: string
}

type DeleteProps = {
    id: string
}

class PromoService {

    constructor(private readonly db: PrismaClient) {}

    async create(data: AddProps) {
        return this.db.promo.create({ data })
    }

    async update(data: UpdateProps) {
        return this.db.promo.update({
            where: { id: data.id },
            data: {
                code: data.code,
                userId: data.userId,
            },
        })
    }

    async remove(data: DeleteProps) {
        return this.db.promo.delete({ where: { id: data.id } })
    }

    async findOne(id: string) {
        return this.db.promo.findUnique({ where: { id } })
    }

    async findAll() {
        return this.db.promo.findMany()
    }

    async findAllByUser(userId: string) {
        return this.db.promo.findMany({ where: { userId } })
    }

    async findByCode(code: string) {
        return this.db.promo.findFirst({ where: { code } })
    }
}

// Export singleton instance
export const promoService = new PromoService(prisma)
