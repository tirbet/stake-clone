import { ErrorMessage } from "@/components/error-message";
import { Game } from "@/components/sport/game";
import type { Metadata } from 'next'
import { getGame } from "@/lib/sport/fetch-sport";
import SportBreadcrumb from "@/components/sport/sport-breadcrumb";
import { getTranslations } from "next-intl/server";
import { useTeamsDisplayName } from "@/lib/sport/sport-helper";
type Props = {
  params: Promise<{
    status: string,
    sport: string;
    league: string;
    game: string
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { data } = await getGame(params);
  const home = data?.data?.team?.home?.name;
  const away = data?.data?.team?.away?.name;
  const appName = process.env.APP_NAME || "My App";
  const sport = data?.data?.sport?.name;
  const league = data?.data?.league?.name;
  const country = data?.data?.country?.name;
  const location = data?.data?.matchInfo?.location;
  return {
    title: home && away ? `${home} vs ${away} - ${appName}` : "Game " + appName,
    description: `${home ?? "Home"} vs ${away ?? "Away"} ${sport ? `${sport} match` : "match"
      } in ${league ?? "league"} (${country ?? "country"})${location ? ` at ${location}` : ""
      }. Live odds, stats, lineups, and match details.`,
  };
}

export default async function Sport({ params }: Readonly<Props>) {
  const { status } = await params;
  const { data: items, error } = await getGame(params);
  if (error || !items) {
    return (
      <ErrorMessage
        title={error.error}
        message={`"${status}" is not a valid status. Please use "live" or "upcoming".`}
      />
    );
  }
  const { data } = items;
  const t = await getTranslations('status');
  const teams = useTeamsDisplayName(data?.team)
  return (
    <>
      <SportBreadcrumb back="" items={[
        {
          name: t(`${data.status}`),
          url: `/sports/${data.status}`
        },
        {
          name: `${data?.sport.name}`,
          url: data.sport.slug,
        },
        {
          name: `${data?.league.name}`,
          url: data?.league.slug,
        },
        {
          name: `${teams}`,
          url: data?.slug,
        }

      ]} />
      <Game data={data} />
    </>
  );
}



