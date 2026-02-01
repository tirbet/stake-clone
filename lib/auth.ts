import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from 'better-auth/next-js';
import { emailOTP, twoFactor, phoneNumber, openAPI, admin, createAuthMiddleware } from "better-auth/plugins"
import { Resend } from 'resend';
import { EmailTemplates } from "@/lib/email-templates";
import { promoService, currencyService } from "@/lib/services";
import {
  ac,
  customerSupportAgentRole,
  customerSupportSupervisorRole,
  paymentProcessorRole,
  settlementAgentRole,
  tradingOperatorRole,
  riskAnalystRole,
  riskManagerRole,
  amlAnalystRole,
  complianceOfficerRole,
  securityAnalystRole,
  uboRole,
  ceoRole,
  mlroRole,
  chiefRiskOfficerRole,
  technicalSuperAdminRole,
  platformAdministratorRole,
  complianceDirectorRole,
  riskDirectorRole,
  operationsManagerRole,
  financeAdministratorRole,
  securityAdministratorRole,
  systemAdministratorRole,
  supervisorRole,
  fraudInvestigatorRole,
  auditorRole,
  promotionManagerRole,
  promotionOperatorRole,
  productManagerRole,
  productOperatorRole,
  contentManagerRole,
  contentEditorRole,
} from "@/lib/permissions";
import { SystemRole } from "@/lib/constants/roles";

export const resend = new Resend(process.env.RESEND_API_KEY);



export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const data = ctx.body;
        let referredById: string | undefined;
        if (data.code) {
          const promo = await promoService.findByCode(data.code);
          if (!promo) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid promo code",
            });
          }
          referredById = promo.userId;
        }
        let currencyId: string;
        if (data.currency) {
          const currency = await currencyService.findById(data.currency);
          if (!currency) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid currency code",
            });
          }
          currencyId = currency.id
        } else {
          const currency = await currencyService.findByCode("USD");
          currencyId = currency!.id
        }

        return {
          context: {
            ...ctx,
            body: {
              ...ctx,
              currency: currencyId,
              code: referredById,
            },
          }
        };
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const { currency, email, referredById } = ctx.body as { referredById: string | undefined, email: string, currency: string };
        await prisma.user.update({
          where: { email },
          data: {
            referredById,
            wallets: {
              createMany: {
                data: [
                  {
                    currencyId: currency,
                    isActive: true,
                    isBonus: false,
                    isFrozen: false,
                  },
                  {
                    currencyId: currency,
                    isActive: true,
                    isBonus: true,
                    isFrozen: false,
                  }
                ]
              }
            }
          }
        });
      }
    })
  },
  user: {
    additionalFields: {
      code: {
        type: "string",
        input: false,
        required: false,
      },
      currency: {
        type: "string",
        input: false,
        required: false,
      },
    }
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true
    },
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      partitioned: true
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  plugins: [
    openAPI(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const template = EmailTemplates.otpVerification({ otp, type, email });
        if (type === "sign-in") {
          // Send the OTP for sign in
        } else if (type === "email-verification") {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: 'rashedul.bcc@gmail.com',
            subject: template.subject,
            html: template.html,
          })
        } else {
          // Send the OTP for password reset
        }
      },
      allowedAttempts: 2,
      expiresIn: 600,
      otpLength: 6,
    }),
    twoFactor(),
    phoneNumber(),
    admin({
      ac,
      roles: {
        [SystemRole.CUSTOMER_SUPPORT_AGENT]: customerSupportAgentRole,
        [SystemRole.CUSTOMER_SUPPORT_SUPERVISOR]: customerSupportSupervisorRole,
        [SystemRole.PAYMENT_PROCESSOR]: paymentProcessorRole,
        [SystemRole.SETTLEMENT_AGENT]: settlementAgentRole,
        [SystemRole.TRADING_OPERATOR]: tradingOperatorRole,
        [SystemRole.RISK_ANALYST]: riskAnalystRole,
        [SystemRole.RISK_MANAGER]: riskManagerRole,
        [SystemRole.AML_ANALYST]: amlAnalystRole,
        [SystemRole.COMPLIANCE_OFFICER]: complianceOfficerRole,
        [SystemRole.SECURITY_ANALYST]: securityAnalystRole,
        [SystemRole.CONTENT_EDITOR]: contentEditorRole,
        [SystemRole.CONTENT_MANAGER]: contentManagerRole,
        [SystemRole.PRODUCT_OPERATOR]: productOperatorRole,
        [SystemRole.PRODUCT_MANAGER]: productManagerRole,
        [SystemRole.PROMOTION_OPERATOR]: promotionOperatorRole,
        [SystemRole.PROMOTION_MANAGER]: promotionManagerRole,
        [SystemRole.AUDITOR]: auditorRole,
        [SystemRole.FRAUD_INVESTIGATOR]: fraudInvestigatorRole,
        [SystemRole.SUPERVISOR]: supervisorRole,
        [SystemRole.SYSTEM_ADMINISTRATOR]: systemAdministratorRole,
        [SystemRole.SECURITY_ADMINISTRATOR]: securityAdministratorRole,
        [SystemRole.FINANCE_ADMINISTRATOR]: financeAdministratorRole,
        [SystemRole.OPERATIONS_MANAGER]: operationsManagerRole,
        [SystemRole.RISK_DIRECTOR]: riskDirectorRole,
        [SystemRole.COMPLIANCE_DIRECTOR]: complianceDirectorRole,
        [SystemRole.PLATFORM_ADMINISTRATOR]: platformAdministratorRole,
        [SystemRole.TECHNICAL_SUPER_ADMIN]: technicalSuperAdminRole,
        [SystemRole.CHIEF_RISK_OFFICER]: chiefRiskOfficerRole,
        [SystemRole.MONEY_LAUNDERING_REPORTING_OFFICER]: mlroRole,
        [SystemRole.CHIEF_EXECUTIVE_OFFICER]: ceoRole,
        [SystemRole.ULTIMATE_BENEFICIAL_OWNER]: uboRole,
      },
      defaultRole: 'user',
      adminRoles: [SystemRole.ULTIMATE_BENEFICIAL_OWNER],
      impersonationSessionDuration: 60 * 60 * 24, // 1 day
      defaultBanReason: "Violation of rules",
      bannedUserMessage: "Please contact support if you believe this is an error.",
    }),
    nextCookies()
  ],
});


