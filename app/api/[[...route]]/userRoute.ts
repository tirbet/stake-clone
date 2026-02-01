import prisma from '@/lib/prisma';
import { authMiddleware } from '@/middleware/auth.middleware';
import { Hono } from 'hono';
import { kycIdSchema, kycSchema } from "@/schemas/kyc.schema";
import { zValidator } from '@hono/zod-validator';
import { uploadKycFile } from '@/lib/upload-r2';

type KycMetadataValue = Record<string, string>;
type KycMetadataLevel = {
    level: number;
    value: KycMetadataValue | {};
};

const app = new Hono({ strict: false })
    .use('*', authMiddleware)
    .post('kyc/:label',
        zValidator("param", kycIdSchema),
        zValidator("form", kycSchema),
        async (c) => {
            const { userId } = c.get("session");
            const { label: kycLevel } = c.req.valid("param");
            const form = c.req.valid("form");

            if (![1, 2, 3].includes(kycLevel)) {
                return c.json({ message: "Invalid KYC level" }, 400);
            }


            // destructure file fields out of form
            const {
                idFrontPath,
                idBackPath,
                selfieWithIdPath,
                paymentProofPath,
                bankStatementPath,
                ...rest
            } = form;

            let metadata: KycMetadataLevel[] = [];

            if (kycLevel === 1) {
                const { firstName, lastName, country, birthDate } = form;
                metadata = [
                    {
                        level: kycLevel,
                        value: {
                            firstName,
                            lastName,
                            country,
                            birthDate,
                            verifiedAt: null,
                            adminNotes: null,
                            status: "SUBMITTED" as const,
                        }
                    }
                ];
            }
            if (kycLevel === 2) {
                const kyc = await prisma.kyc.findUnique({
                    where: { userId }
                })
                if (!kyc) {
                    return c.json({ message: "Level 1 KYC not found" }, 400);
                }
                const existingMetadata = (kyc.metadata as KycMetadataLevel[]) ?? [];
                const { idType, idNumber, idFrontPath, idBackPath } = form;
                const idFrontUrl = await uploadKycFile(userId, 'id-front', idFrontPath);
                const idBackUrl = await uploadKycFile(userId, 'id-back', idBackPath);
                const level2Value = {
                    idType,
                    idNumber,
                    idFrontPath: idFrontUrl,
                    idBackPath: idBackUrl,
                    verifiedAt: null,
                    adminNotes: null,
                    status: "SUBMITTED" as const,
                }
                // remove any existing level 2 entry, then add new one
                const withoutLevel2 = existingMetadata.filter((m) => m.level !== 2);
                metadata = [
                    ...withoutLevel2,
                    {
                        level: 2,
                        value: level2Value,
                    },
                ];
            }

            if (kycLevel === 3) {
                const kyc = await prisma.kyc.findUnique({
                    where: { userId }
                })
                if (!kyc) {
                    return c.json({ message: "Previous KYC levels not found" }, 400);
                }
                const existingMetadata = (kyc.metadata as KycMetadataLevel[]) ?? [];
                const { paymentMethod, bankStatementPath, paymentProofPath, selfieWithIdPath } = form;
                const selfieUrl = await uploadKycFile(userId, "selfie", selfieWithIdPath);
                const paymentProofUrl = await uploadKycFile(userId, 'payment-proof', paymentProofPath);
                const bankStatementUrl = await uploadKycFile(userId, "bank-statement", bankStatementPath);
                const level3Value = {
                    paymentMethod,
                    paymentProofPath: paymentProofUrl,
                    bankStatementPath: bankStatementUrl,
                    selfieWithIdPath: selfieUrl,
                    verifiedAt: null,
                    adminNotes: null,
                    status: "SUBMITTED" as const,
                }
                // remove any existing level 2 entry, then add new one
                const withoutLevel3 = existingMetadata.filter((m) => m.level !== 2);
                metadata = [
                    ...withoutLevel3,
                    {
                        level: 3,
                        value: level3Value,
                    },
                ];
            }
            await prisma.kyc.upsert({
                where: { userId },
                create: {
                    userId,
                    metadata
                },
                update: {
                    metadata
                },
            });

            return c.json({ message: "KYC submitted successfully" });
        })

export default app;