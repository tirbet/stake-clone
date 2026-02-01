import { PaymentMethodType } from "@/prisma/generated/prisma/enums";
import * as z from "zod";

// Payment method types as constants
export const PAYMENT_METHOD_TYPES = {
  CRYPTO: 'crypto',
  MOBILE_MONEY: 'mobile_money',
  BANK_TRANSFER: 'bank_transfer',
  CARD: 'card',
  E_WALLET: 'e_wallet',
} as const;
export const CRYPTO_CURRENCIES = {
  BTC: 'BTC',
  ETH: 'ETH',
  USDT: 'USDT',
  USDC: 'USDC',
  BNB: 'BNB',
  XRP: 'XRP',
  SOL: 'SOL',
  ADA: 'ADA',
  LTC: 'LTC',
  DOGE: 'DOGE',
} as const;

export const CRYPTO_NETWORKS = {
  // Ethereum ecosystem
  ERC20: "ERC20",

  // Tron
  TRC20: "TRC20",

  // Binance
  BEP20: "BEP20",

  // Bitcoin
  BTC: "BTC",

  // Solana
  SOL: "SOL",

  // Polygon
  POLYGON: "POLYGON",

  // Avalanche
  AVAXC: "AVAXC",

  // Arbitrum
  ARBITRUM: "ARBITRUM",

  // Optimism
  OPTIMISM: "OPTIMISM",

  // Litecoin
  LTC: "LTC",

  // Dogecoin
  DOGE: "DOGE",

  // XRP Ledger
  XRP: "XRP",
} as const;


export const NETWORK_CONFIRMATIONS: Record<CryptoNetwork, number> = {
  ERC20: 12,
  TRC20: 20,
  BEP20: 15,

  BTC: 3,
  LTC: 6,
  DOGE: 20,

  SOL: 1,
  POLYGON: 20,
  AVAXC: 12,
  ARBITRUM: 10,
  OPTIMISM: 10,

  XRP: 1,
};

export const CRYPTO_NETWORK_LABELS: Record<CryptoNetwork, string> = {
  ERC20: "Ethereum (ERC20)",
  TRC20: "Tron (TRC20)",
  BEP20: "BNB Chain (BEP20)",

  BTC: "Bitcoin",
  LTC: "Litecoin",
  DOGE: "Dogecoin",

  SOL: "Solana",
  POLYGON: "Polygon",
  AVAXC: "Avalanche C-Chain",
  ARBITRUM: "Arbitrum",
  OPTIMISM: "Optimism",

  XRP: "XRP Ledger",
};

export type CryptoNetwork =
  (typeof CRYPTO_NETWORKS)[keyof typeof CRYPTO_NETWORKS];

export const SUPPORTED_NETWORKS_BY_CURRENCY: Record<
  keyof typeof CRYPTO_CURRENCIES,
  readonly (keyof typeof CRYPTO_NETWORKS)[]
> = {
  BTC: ["BTC"],
  ETH: ["ERC20"],
  USDT: ["ERC20", "TRC20", "BEP20", "SOL"],
  USDC: ["ERC20", "BEP20", "SOL"],
  BNB: ["BEP20"],
  XRP: ["XRP"],
  SOL: ["SOL"],
  ADA: ["ERC20"], // or native later
  LTC: ["BTC"],
  DOGE: ["BTC"],
};
export const MOBILE_MONEY_PROVIDERS = {
  Bkash: 'bkash',
  Nagad: 'nagad',
  Rocket: 'rocket',
  SureCash: 'surecash',
  mCash: 'mcash',
  TAP: 'tap',
} as const;

export const BANK_TRANSFER_TYPES = {
  LOCAL_BANK: 'local_bank',
  INTERNATIONAL_BANK: 'international_bank',
} as const;

export const CARD_PROCESSORS = {
  Stripe: 'stripe',
  PayPal: 'paypal',
  Square: 'square',
  AuthorizeNet: 'authorize_net',
} as const;

export const E_WALLET_PROVIDERS = {
  PayPal: 'paypal',
  Skrill: 'skrill',
  Neteller: 'neteller',
  Payoneer: 'payoneer',
  PerfectMoney: 'perfect_money',
} as const;

// Base payment method schema
export const paymentMethodSchema = z.object({
  name: z.string().min(1, "Payment method name is required"),
  type: z.enum(PaymentMethodType),
  provider: z.string().min(1, "Provider is required"),
  isActive: z.boolean(),
  settings: z.record(z.string(), z.any()).optional(),
  displayOrder: z.number(),
  icon: z.string().optional(),
  description: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  feePercentage: z.number(),
  feeFixed: z.number(),
});

// Crypto-specific schema
export const cryptoPaymentSchema = paymentMethodSchema.extend({
  type: z.literal(PAYMENT_METHOD_TYPES.CRYPTO),
  provider: z.enum(CRYPTO_CURRENCIES),

  settings: z.object({
    network: z.enum(CRYPTO_NETWORKS),

    confirmationsRequired: z
      .number()
      .int()
      .positive(),

    qrCode: z.string().optional(),
    exchangeRateProvider: z.string().optional(),
  }),
}).superRefine((data, ctx) => {
  const { network, confirmationsRequired } = data.settings;

  const minConfirmations = NETWORK_CONFIRMATIONS[network];

  if (confirmationsRequired < minConfirmations) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["settings", "confirmationsRequired"],
      message: `Minimum confirmations for ${network} is ${minConfirmations}`,
    });
  }
});

// Mobile money schema
export const mobileMoneySchema = paymentMethodSchema.extend({
  type: z.literal(PAYMENT_METHOD_TYPES.MOBILE_MONEY),
  provider: z.enum(MOBILE_MONEY_PROVIDERS),
  settings: z.object({
    accountNumber: z.string().min(1, "Account number is required"),
    accountType: z.string().optional(),
    merchantNumber: z.string().optional(),
    pin: z.string().optional(),
  }),
});

// Bank transfer schema
export const bankTransferSchema = paymentMethodSchema.extend({
  type: z.literal(PAYMENT_METHOD_TYPES.BANK_TRANSFER),
  provider: z.string().min(1, "Bank name is required"),
  settings: z.object({
    accountNumber: z.string().min(1, "Account number is required"),
    accountName: z.string().min(1, "Account name is required"),
    bankName: z.string().min(1, "Bank name is required"),
    branch: z.string().optional(),
    routingNumber: z.string().optional(),
    swiftCode: z.string().optional(),
    iban: z.string().optional(),
  }),
});

// Card payment schema
export const cardPaymentSchema = paymentMethodSchema.extend({
  type: z.literal(PAYMENT_METHOD_TYPES.CARD),
  provider: z.enum(CARD_PROCESSORS),
  settings: z.object({
    apiKey: z.string().optional(),
    secretKey: z.string().optional(),
    publishableKey: z.string().optional(),
    webhookSecret: z.string().optional(),
    sandboxMode: z.boolean(),
    currency: z.string(),
  }),
});

// E-wallet schema
export const eWalletSchema = paymentMethodSchema.extend({
  type: z.literal(PAYMENT_METHOD_TYPES.E_WALLET),
  provider: z.enum(E_WALLET_PROVIDERS),
  settings: z.object({
    email: z.email().optional(),
    accountId: z.string().optional(),
    apiKey: z.string().optional(),
    sandboxMode: z.boolean(),
  }),
});

// Union type for all payment methods
export const paymentConfigurationSchema = z.union([
  cryptoPaymentSchema,
  mobileMoneySchema,
  bankTransferSchema,
  cardPaymentSchema,
  eWalletSchema,
]);

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CryptoPayment = z.infer<typeof cryptoPaymentSchema>;
export type MobileMoneyPayment = z.infer<typeof mobileMoneySchema>;
export type BankTransferPayment = z.infer<typeof bankTransferSchema>;
export type CardPayment = z.infer<typeof cardPaymentSchema>;
export type EWalletPayment = z.infer<typeof eWalletSchema>;
export type PaymentConfiguration = z.infer<typeof paymentConfigurationSchema>;