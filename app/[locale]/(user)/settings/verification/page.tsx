import VerificationCard from "@/components/user/verification/verification-card";
import { getSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { KycSchema } from "@/schemas/kyc.schema";
import { unauthorized } from "next/navigation";

export default async function Page() {
  const { session } = await getSession();
  if (!session) return unauthorized();
  const kyc = await prisma.kyc.findUnique({
    where: { userId: session.userId },
  });
  const metadata = (kyc?.metadata ?? {}) as Record<string, unknown>;
  const initialKyc: Partial<KycSchema> | null = kyc
    ? {
      ...metadata,
      // if you mapped idType into the form:
      idType: kyc.idType ?? undefined,
      // add paymentMethod here later if you add it to model
    }
    : null;

  return (
    <VerificationCard
      initialKyc={initialKyc}
      status={kyc?.status ?? null}
    />

  );
}



