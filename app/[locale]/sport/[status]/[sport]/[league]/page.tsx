import { ErrorMessage } from "@/components/error-message";
import AppLayout from "@/components/layouts/app-layout";
import SportSideBar from "@/components/sidebar/sport-sidebar";
import { LeagueList } from "@/components/sport/event";
import { auth } from "@/lib/auth";
import { getSportIdByName } from "@/lib/data";
import { headers } from "next/headers";

type Props = {
  params: Promise<{
    status: "live" | "upcoming",
    sport: string,
    league: string
  }>;
};

export default async function League({ params }: Readonly<Props>) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const { status, sport, league } = await params;
  if (status !== "live" && status !== "upcoming") {
    return (
      <ErrorMessage
        title="Invalid Status"
        message={`"${status}" is not a valid status. Please use "live" or "upcoming".`}
      />
    );
  }
  const id = getSportIdByName(sport);
  const leagueId = league.split("-")[0];
  if (!id) {
    return (
      <ErrorMessage
        title="Sport Not Found"
        message={`The sport "${sport}" does not exist.`}
      />
    );
  }
  if (isNaN(Number(leagueId))) {
    return (
      <ErrorMessage
        title="League Not Found"
        message={`The league "${league}" does not exist.`}
      />
    );
  }
  return (
    <AppLayout
      user={data?.user}
      sidebarItem={<SportSideBar type={status} />}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col w-full px-1.5 mt-0.5 md:px-4 md:mt-2">
        <LeagueList id={id} leagueId={+leagueId} type={status} />
      </div>
    </AppLayout>


  );
}



