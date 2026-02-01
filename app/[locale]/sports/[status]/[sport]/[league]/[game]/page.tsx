import { ErrorMessage } from "@/components/error-message";
import { Game } from "@/components/sport/game";
import { apiClient } from "@/lib/api-client";
import { getLocale } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from 'next'
import { getGame } from "@/lib/sport/fetch-sport";
type Props = {
  params: Promise<{
    status: string,
    sport: string;
    league: string;
    game: string
  }>;
};
type Locale = "en" | "bn" | "hi";



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
    title: home && away ? `${home} vs ${away} - ${appName}` : "Game " + appName ,
    description: `${home ?? "Home"} vs ${away ?? "Away"} ${sport ? `${sport} match` : "match"
      } in ${league ?? "league"} (${country ?? "country"})${location ? ` at ${location}` : ""
      }. Live odds, stats, lineups, and match details.`,
  };
}

export default async function Sport({ params }: Readonly<Props>) {
  const { status } = await params;
  const { data, error } = await getGame(params);
  if (error) {
    return (
      <ErrorMessage
        title={error.error}
        message={`"${status}" is not a valid status. Please use "live" or "upcoming".`}
      />
    );
  }

  return (<Game data={data?.data} />);
}



