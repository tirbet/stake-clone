import { AE, E, Get1x2_VZip, GetSportsShortZip, ScoreContext } from "@/types/sport.row";
import { formatTeams, formatWeatherInfo, transformOddsData } from "./sport-utils";
import { headers } from "next/headers";

type League = {
    id: number;
    gc: number;
    name: string;
    nameEn: string;
};

type CountryGroup = {
    id: number;
    name: string;
    leagues: League[];
};




export async function fetchSportsData<T = unknown>({ url }: { url: string }): Promise<T> {
    const parsedUrl = new URL(url);
    // Access query parameters
    const params = Array.from(parsedUrl.searchParams.entries()).map(
        ([key, value]) => `${key}-${value}`
    );
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url,
        {
            signal: controller.signal,
            next: { revalidate: 5 },
            
        });

    clearTimeout(timeout);

    if (!response.ok) {
        throw new Error(`Failed to fetch sports data (${response.status})`);
    }

    return response.json();
}


export const transformSports = (rawData: GetSportsShortZip) => {

    return rawData.Value
        .filter(
            (sport) =>
                sport.MS !== 3 &&
                sport.MS !== 9
        )
        .map((sport) => {
            const allLeagues: {
                id: number;
                name: string;
                nameEn: string;
                gc: number;
                countryId: number;
                country: string;
            }[] = [];

            sport.L?.forEach((league) => {
                if (league.CI !== undefined) {
                    allLeagues.push({
                        id: league.LI,
                        name: league.L,
                        nameEn: league.LE ?? league.L,
                        gc: league.GC,
                        countryId: league.CI,
                        country: league.CN,
                    });
                }

                league.SC?.forEach((sub) => {
                    if (sub.CI !== undefined) {
                        allLeagues.push({
                            id: sub.LI,
                            name: sub.L,
                            nameEn: sub.LE ?? sub.L,
                            gc: sub.GC,
                            countryId: sub.CI,
                            country: sub.CN,
                        });
                    }
                });
            });

            const countries: CountryGroup[] = Object.values(
                allLeagues.reduce<Record<number, CountryGroup>>((acc, league) => {
                    if (!acc[league.countryId]) {
                        acc[league.countryId] = {
                            id: league.countryId,
                            name: league.country,
                            leagues: [],
                        };
                    }
                    acc[league.countryId].leagues.push({
                        id: league.id,
                        name: league.name,
                        nameEn: league.nameEn,
                        gc: league.gc,
                    });
                    return acc;
                }, {})
            );

            return {
                id: sport.I,
                name: sport.N,
                nameEn: sport.E ?? sport.N,
                gc: sport.C,
                lc: sport.CC,
                countries,
            };
        })
        .filter((sport) => sport.countries.length > 0);
}

export const transformGet1x2_VZip = (rawData: Get1x2_VZip) => {

    return rawData.Value.flatMap(item => ({
        Id: item.KI === 1 ? item.I : item.CI,
        league: item.L,
        leagueEn: item.LE,
        leagueId: item.LI,
        CI: item.CI,
        CID: item.CID,
        MG: null, //TODO MG
        countryId: item.COI,
        country: item.CN,
        markets: transformOddsData({ E: item.E }), // TODO E
        EC: item.EC,
        HHTHS: item.HHTHS,
        HS: item.HS,
        HSI: item.HSI,
        status: item.KI,
        matchInfo: item.MIO ? {
            location: item.MIO.Loc,
            stage: item.MIO.TSt,
            format: item.MIO.MaF
        } : undefined,
        weatherInfo: formatWeatherInfo(item.MIS ?? []),
        N: item.N,
        team: formatTeams(item),
        phaseName: item.TG ?? item.PN ?? 'Main',
        startTime: item.S,
        sportId: item.SI,
        sport: item.SN,
        sportEn: item.SE,
        SGC: item.SGC,
        SGI: item.SGI,
        SIMG: item.SIMG,
        SS: item.SS,
        SSI: item.SSI,
        SST: item.SST,
        STI: item.STI,
        SUBA: item.SUBA,
        SmI: item.SmI,
        timeName: item.TN,
        TNS: item.TNS,
        B: item.B,
        ScoreContext: formatScoreContext(item.SC)
    }))
}


const formatScoreContext = (item?: ScoreContext) => ({
    currentPeriod: item?.CP,
    stageLiveStatus: item?.SLS,
    currentPeriodString: item?.CPS,
    fullScore: {
        home: item?.FS.S1 || 0,
        away: item?.FS.S2 || 0,
    },
    info: item?.I,
    period: item?.P,
    periodScores: item?.PS,
    setScore: undefined, //TODO 
    timeoutRemaining: item?.TR,
    timeSeconds: item?.TS,
    matchStatistics: item?.ST,
})



