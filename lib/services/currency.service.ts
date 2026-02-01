import { PrismaClient } from "@/prisma/generated/prisma/client";
import prisma from "@/lib/prisma";

class CurrencyService {
  constructor(private readonly db: PrismaClient) {}

  /**
   * Create a new currency
   */
  async create(data: {
    code: string;
    name: string;
    symbol?: string;
    useRate?: number;
    decimals?: number;
    isActive?: boolean;
  }) {
    return this.db.currency.create({
      data: {
        code: data.code,
        name: data.name,
        symbol: data.symbol,
        useRate: data.useRate ?? 0.0,
        decimals: data.decimals ?? 2,
        isActive: data.isActive ?? true,
      },
    });
  }

  /**
   * Update an existing currency
   */
  async update(
    id: string,
    data: {
      name?: string;
      symbol?: string;
      useRate?: number;
      decimals?: number;
      isActive?: boolean;
    }
  ) {
    return this.db.currency.update({
      where: { id },
      data: {
        ...data,
        useRate: data.useRate ?? undefined, // only update if provided
      },
    });
  }

  /**
   * Find currency by ID
   */
  async findById(id: string) {
    return this.db.currency.findUnique({
      where: { id }
    });
  }

  /**
   * Find currency by code
   */
  async findByCode(code: string) {
    return this.db.currency.findUnique({
      where: { code },
    });
  }

  /**
   * List all currencies
   */
  async listAll() {
    return this.db.currency.findMany({
       select: {
        id: true,
        code: true,
        symbol: true,
        name: true
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * List only active currencies
   */
  async listActive() {
    return this.db.currency.findMany({
      where: { isActive: true },
      select: {
        id: true,
        code: true,
        symbol: true,
        name: true
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Delete a currency
   */
  async remove(id: string) {
    return this.db.currency.delete({
      where: { id },
    });
  }

  /**
   * Count total currencies
   */
  async count() {
    return this.db.currency.count();
  }
}

// Export a single instance for server-side usage
export const currencyService = new CurrencyService(prisma);
