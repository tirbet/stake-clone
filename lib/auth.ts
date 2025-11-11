import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      userType: {
        type: "string",
        input: false
      },
      roleId: {
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
    nextCookies()
  ],
});