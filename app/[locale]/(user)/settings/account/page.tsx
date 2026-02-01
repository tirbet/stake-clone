import { EmailCard } from "@/components/user/settings/email-card";
import { PhoneNumberCard } from "@/components/user/settings/phone-number-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export default async function Page() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.user) {
    throw new Error("User not authenticated");
  }
  const emailData = {
    updatedAt: data.user.updatedAt,
    email: data.user.email,
    emailVerified: data.user.emailVerified,
  };
  return (
    <div className="w-full space-y-6">
      <EmailCard data={emailData} />
      <PhoneNumberCard />
    </div>
  );
}



