import type { GetGameZipValue } from "@/types/sport.row";
import { formatTeams, formatWeatherInfo, sportGroupMap, transformOddsData } from "./sport-utils";

export const transformEvent = (event: GetGameZipValue) => {
    const isLive = event.KI === 1 ? true : false;
    let groups = event.SG ? event.SG.map(sg => sportGroupMap(sg, isLive)) : event.BIG ? event.BIG.map(bg => sportGroupMap(bg, isLive)) : [];
    if (event.CMG) {
        groups.unshift({
            id: event.CMG,
            name: 'Main'
        })
    }else{
        groups.unshift({
            id: event.CI,
            name: "Main"
        })
    }
    return {
        Id: isLive ? event.I : event.CI,
        league: event.L,
        leagueEn: event.LE,
        leagueId: event.LI,
        country: event.CN,
        countryId: event.COI,
        markets: transformOddsData({ GE: event.GE }), // TODO here
        EC: event.EC,
        EGC: event.EGC,
        GLI: event.GLI,
        HHTHS: event.HHTHS,  // Has Half Time/Home Score data
        HLU: event.HLU, // Has Live Updates
        HSI: event.HSI, // Has Statistics Info
        HSRT: event.HSRT, // Has Start/Resume Time
        status: event.KI,
        matchInfo: event.MIO ? {
            location: event.MIO.Loc,
            stage: event.MIO.TSt,
            format: event.MIO.MaF
        } : undefined,
        weatherInfo: formatWeatherInfo(event.MIS),
        N: event.N,
        team: formatTeams(event),
        phaseName: event.TG.trim() ?? event.PN.trim() ?? 'Main',
        startTime: event.S,
        sportId: event.SI,
        sport: event.SN,
        sportEn: event.SE,
        SGI: event.SGI,
        SIMG: event.SIMG,
        SS: event.SS,
        SSI: event.SSI,
        SST: event.SST,
        STI: event.STI,
        SUBA: event.SUBA,
        SmI: event.SmI,
        timeName: event.TN,
        TNS: event.TNS,
        B: event.B,
        groups

    }
}