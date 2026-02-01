import prisma from "@/lib/prisma";
import { PrismaClient } from "@/prisma/generated/prisma/client";

class WalletService {
    constructor(private readonly db: PrismaClient) { }


    async create({
        data,
        createBonus = false,
    }: {
        data: { userId: string; currencyId: string; isActive?: boolean };
        createBonus?: boolean;
    }) {
        return this.db.$transaction(async (tx) => {
            await tx.wallet.updateMany({
                where: { userId: data.userId, isBonus: false },
                data: { isActive: false },
            });
            const mainWallet = await tx.wallet.create({
                data: {
                    userId: data.userId,
                    currencyId: data.currencyId,
                    isBonus: false,
                    isActive: true,
                    balance: 0,
                },
                select: this.walletWithCurrencySelect(),
            });

            let bonusWallet = null;
            if (createBonus) {
                bonusWallet = await tx.wallet.create({
                    data: {
                        userId: data.userId,
                        currencyId: data.currencyId,
                        isBonus: true,
                        isActive: false,
                        balance: 0,
                    },
                    select: this.walletWithCurrencySelect(),
                });
            }

            return { mainWallet, bonusWallet };
        });
    }


    async active(userId: string) {
        return this.db.wallet.findFirst({
            where: { userId, isActive: true, isBonus: false },
            select: this.walletWithCurrencySelect(),
        })
    }

    async activeBonus(userId: string) {
        return this.db.wallet.findFirst({
            where: { userId, isActive: true, isBonus: true },
            select: this.walletWithCurrencySelect(),
        });
    }

    async findById(id: number) {
        return this.db.wallet.findUnique({
            where: { id },
            select: this.walletWithCurrencySelect(),
        });
    }

    async listByUser(userId: string) {
        return this.db.wallet.findMany({
            where: { userId },
            select: this.walletWithCurrencySelect(),
            orderBy: { createdAt: "desc" },
        });
    }

    async increment(id: number, amount: number) {
        return this.db.wallet.update({
            where: { id },
            data: { balance: { increment: amount } },
        });
    }
    async decrement(id: number, amount: number) {
        const wallet = await this.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        if (wallet.balance.toNumber() < amount) throw new Error("Insufficient balance");
        return this.db.wallet.update({
            where: { id },
            data: { balance: { decrement: amount } },
        });
    }

    async remove(id: number) {
        return this.db.wallet.delete({ where: { id } });
    }

    async setActive(userId: string, walletId: number) {
        const wallet = await this.findById(walletId);
        if (!wallet) throw new Error("Wallet not found");
        return this.db.$transaction(async (tx) => {
            if (!wallet.isBonus) {
                // deactivate main wallets only
                await tx.wallet.updateMany({
                    where: { userId, isBonus: false },
                    data: { isActive: false },
                });
            }
            return tx.wallet.update({
                where: { id: walletId },
                data: { isActive: true },
            });
        });
    }

    async transfer(fromId: number, toId: number, amount: number) {
        return this.db.$transaction(async (tx) => {
            const fromWallet = await tx.wallet.findUnique({ where: { id: fromId } });
            if (!fromWallet) throw new Error("From wallet not found");
            if (fromWallet.balance.toNumber() < amount) throw new Error("Insufficient balance");

            const updatedFrom = await tx.wallet.update({
                where: { id: fromId },
                data: { balance: { decrement: amount } },
            });
            const updatedTo = await tx.wallet.update({
                where: { id: toId },
                data: { balance: { increment: amount } },
            });

            return { fromWallet: updatedFrom, toWallet: updatedTo };
        });
    }

    async hasSufficientBalance(id: number, amount: number) {
        const wallet = await this.findById(id)
        return wallet ? wallet.balance.toNumber() >= amount : false;
    }

    async freeze(id: number) {
        const wallet = await this.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        return this.db.wallet.update({
            where: { id },
            data: { isFrozen: true },
        });
    }

    async unfreeze(id: number) {
        const wallet = await this.findById(id);
        if (!wallet) throw new Error("Wallet not found");
        return this.db.wallet.update({
            where: { id },
            data: { isFrozen: false },
        });
    }

    private walletWithCurrencySelect() {
        return {
            id: true,
            balance: true,
            isActive: true,
            isBonus: true,
            isFrozen: true,
            currency: {
                select: {
                    id: true,
                    code: true,
                    name: true,
                    symbol: true,
                },
            },
        };
    }


}

export const walletService = new WalletService(prisma);