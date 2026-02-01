import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { useIsMobile } from "@/hooks/use-mobile";

export const groupEventsByCountryAndLeague = (
  events: GetSportsResponse
) => {
  const countryMap = new Map<
    number,
    {
      country: GetSportsResponse[number]["country"];
      leagues: Map<
        number,
        {
          id: number;
          name: string;
          slug: string;
          items: GetSportsResponse;
        }
      >;
    }
  >();

  for (const event of events) {
    const countryId = event.country.id;
    const leagueId = event.league.id;

    // init country
    if (!countryMap.has(countryId)) {
      countryMap.set(countryId, {
        country: event.country,
        leagues: new Map(),
      });
    }

    const countryEntry = countryMap.get(countryId)!;

    // init league
    if (!countryEntry.leagues.has(leagueId)) {
      countryEntry.leagues.set(leagueId, {
        id: event.league.id,
        name: event.league.name,
        slug: event.league.slug,
        items: [],
      });
    }

    // push event
    countryEntry.leagues.get(leagueId)!.items.push(event);
  }

  // convert Map → Array
  return Array.from(countryMap.values()).map(({ country, leagues }) => ({
    country,
    leagues: Array.from(leagues.values()),
  }));
};



export const getDisplayName = (type: 'live' | 'upcoming'): string => {
    return type === 'live' ? 'Live' : 'Upcoming';
};

export const truncate = (str: string = "", len = 20) => str.length > len ? str.slice(0, len) : str;

export const useTeamsDisplayName = (team?: GetSportsResponse[number]["team"]): string => {
    const isMobile = useIsMobile();

    if (!team) return "home vs away";

    const { home, away } = team;

    return isMobile
        ? `${truncate(home.name, 10)} - ${truncate(away.name, 10)}`
        : `${home.name} vs ${away.name}`;
};

export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}