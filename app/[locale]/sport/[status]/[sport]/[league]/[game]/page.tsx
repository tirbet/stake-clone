import { ErrorMessage } from "@/components/error-message";
import AppLayout from "@/components/layouts/app-layout";
import SportSideBar from "@/components/sidebar/sport-sidebar";
import { Game } from "@/components/sport/game";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Props = {
  params: Promise<{
    locale: string,
    status: "live" | "upcoming",
    sport: string,
    league: string,
    game: string
  }>;
};

export default async function Sport({ params }: Readonly<Props>) {
  const { locale, status, sport, league, game } = await params;
  const data = await auth.api.getSession({
    headers: await headers(),
  });
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
      <div className="max-w-screen-xl mx-auto flex flex-col w-full px-1.5 mt-0.5 md:px-4 md:mt-2">
        <Game eventId={parseInt(game, 10)} status={status} />
      </div>
    </AppLayout>
  );
}



