import { ErrorMessage } from "@/components/error-message";
import Promotion from "@/components/home/Promotion";
import PromotionItem from "@/components/home/PromotionItem";
import AppLayout from "@/components/layouts/app-layout";
import SportSideBar from "@/components/sidebar/sport-sidebar";
import { auth } from "@/lib/auth";
import { topSports } from "@/lib/sport/top-sports";
import { headers } from "next/headers";

type Props = {
  params: Promise<{ status: "live" | "upcoming" }>;
};

export default async function Sport({ params }: Readonly<Props>) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  const { status } = await params;
  const promotions = await topSports(status);

  if (status !== "live" && status !== "upcoming") {
    return (
      <ErrorMessage
        title="Invalid Status"
        message={`"${status}" is not a valid status. Please use "live" or "upcoming".`}
      />
    );
  }
  return (
    <AppLayout
      user={data?.user}
      sidebarItem={<SportSideBar type={status} />}
    >
      <div className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-2">
        <Promotion>
          {promotions.map((event, index) => (
            <PromotionItem
              key={index}
              badgeText={event.badgeText}
              title={event.title}
              description={event.description}
              imageUrl={event.imageUrl}
              buttonText={event.buttonText}
              buttonHref={event.buttonHref}
            />
          ))}
        </Promotion>
      </div>
    </AppLayout>

  );
}



