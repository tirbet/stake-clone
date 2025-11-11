import type { WeatherInfo } from "@/types/sport-type";
import type { E, Get1x2_VZipEvent, GetGameZipValue, MatchInfoItem, SG } from "@/types/sport.row";

export const formatTeams = (item: Get1x2_VZipEvent | GetGameZipValue) => ({
    home: {
        Id: item.O1I,
        name: item.O1,
        nameEn: item.O1E,
        countryId: item.O1C,
        logo: item.O1IMG?.[0] ?? null,
    },
    away: {
        Id: item.O2I,
        name: item.O2,
        nameEn: item.O2E,
        countryId: item.O2C,
        logo: item.O2IMG?.[0] ?? null,
    },
});

export const formatWeatherInfo = (items: MatchInfoItem[]) => {
    const weatherInfo: WeatherInfo = {};
    for (const item of items) {
        const { K, V } = item;

        switch (K) {
            case 9:
                weatherInfo.temperature = V;
                break;
            case 20:
                weatherInfo.cloudLevel = V;
                break;
            case 21:
                weatherInfo.cloudDescription = V;
                break;
            case 22:
                weatherInfo.uvIndex = V;
                break;
            case 23:
                weatherInfo.windSpeed = V;
                break;
            case 24:
                const [direction, unit] = V.split(",");
                weatherInfo.windDirection = direction?.trim();
                weatherInfo.windUnit = unit?.trim();
                break;
            case 25:
                weatherInfo.pressure = { ...(weatherInfo.pressure ?? {}), value: V };
                break;
            case 26:
                weatherInfo.pressure = { ...(weatherInfo.pressure ?? {}), unit: V };
                break;
            case 27:
                weatherInfo.humidity = { ...(weatherInfo.humidity ?? {}), value: V };
                break;
            case 28:
                weatherInfo.humidity = { ...(weatherInfo.humidity ?? {}), unit: V };
                break;
            case 35:
                weatherInfo.precipitation = { ...(weatherInfo.precipitation ?? {}), value: V };
                break;
            case 36:
                weatherInfo.precipitation = { ...(weatherInfo.precipitation ?? {}), unit: V };
                break;
        }
    }
    return Object.keys(weatherInfo).length ? weatherInfo : null;
}

export const sportGroupMap = (item: SG, isLive: boolean) => ({
    id: item.CI,
    name: (item.PN + ' ' + item.TG).trim()
})


export type Outcome = {
    id: number;
    coefficient: number;
    suspended?: boolean;
    point?: number | string;
    ps?: number[]
    pl?: {
        I: number,
        N: string,
        T: number
    }
};

type TransformedGroup = {
    id: number;
    gs: number | undefined;
    outcomes: Outcome[][];
};



type TransformOddsDataProps = {
    GE?: {
        E: E[][];
        G: number;
        GS: number;
    }[];
    E?: E[];
};

export const transformOddsData = ({ E, GE }: TransformOddsDataProps): TransformedGroup[] => {
    const notNeed = [2502, 1118]
    if (GE) {
        return GE.filter(item => !notNeed.includes(item.G)).map(transformGEGroup);
    }

    if (E) {
        return transformEGroup(E);
    }

    return [];
};

const transformGEGroup = (item: { E: E[][]; G: number; GS: number }): TransformedGroup => ({
    id: item.G,
    gs: item.GS,
    outcomes: item.E.map(events =>
        events.map(transformOutcome)
    )
});

const convertNumber = (point: number): number[] => {
    // example input formate point = 2.0075
    return [Math.floor(point), +((point - Math.floor(point)) * 1000).toFixed(1)];
};

const splitPoint = (point: number): number[] => {
    // example point = 1.025 
    const int = Math.floor(point);
    const decimal = +((point - int) * 100).toFixed(1);
    return [int, decimal];
}

const CorrectScore = (point: number): number[] => {
    const int = Math.floor(point); // home goals
    const decimalPart = +(point - int).toFixed(3); // get up to 3 decimal precision

    // away goals (e.g., .001 → 1, .002 → 2)
    const away = decimalPart === 0 ? 0 : Math.round(decimalPart * 1000);

    return [away, int];
}

const ExactNumber = (point?: number): number[] => {
    if (!point) return [0];
    // If no decimal part, return [point] as a single exact number
    if (Number.isInteger(point)) {
        return [point];
    }

    // Otherwise, split into two parts [home, away]
    const home = Math.floor(point);
    const decimalPart = +(point - home).toFixed(3);
    const away = decimalPart === 0 ? 0 : Math.round(decimalPart * 1000);

    return [home, away];
};

const TennisScore = (point: number): number[] => {
    const int = Math.floor(point);
    const decimal = +(point - int).toFixed(3);

    // Convert decimal to actual score
    const player2 = decimal === 0 ? 0 : decimal * 1000;

    // Convert to nice numbers (handle floating precision)
    const player1 = int;
    const p1 = +player1.toFixed(0);
    const p2 = +player2.toFixed(0);

    return [p1, p2];
};


const parseScore = (point: number): number[] => {
    const intPart = Math.floor(point);               // player1 / team1 score
    const decimal = +(point - intPart).toFixed(6);   // decimal part

    // If decimal is zero, player2 score = 0
    if (decimal === 0) return [intPart, 0];

    // Determine scaling factor dynamically based on decimal length
    // Example: 0.015 → scale = 1000, 0.003 → scale = 1000, 0.04 → scale = 100
    const decimalStr = decimal.toString().split('.')[1] || '0';
    const scale = Math.pow(10, decimalStr.length);

    const player2 = Math.round(decimal * scale);

    return [intPart, player2];
};

const transformOutcome = (n: E): Outcome => {
    let point: number | undefined;
    point = ((n.T === 7 || n.T === 8 || n.T === 4555 || n.T === 4563) && !n.P) ? 0 : n.P;

    let ps: number[] | undefined;

    // Handle Total Runs case separately
    if (n.G === 998 && n.P != null) {
        ps = convertNumber(n.P);
    } else if ((n.G === 10694 || n.G === 10695 || n.G === 11245) && n.P != null) {
        ps = splitPoint(n.P);
    } else if (n.G === 8863 || n.G === 136) {
        ps = n.P !== undefined ? CorrectScore(n.P) : [0, 0];
    } else if (n.G === 9939) {
        ps = ExactNumber(n.P)
    } else if ((n.G === 7771 || n.G === 7773) && n.P != null) {
        ps = TennisScore(n.P)
    } else if (([2947,2949,2945].includes(n.G)) && n.P != null) {
        ps = parseScore(n.P)
    }
    else if (point != null) {
        // For other cases, use point as a single number in array
        ps = [point];
    }

    return {
        id: n.T,
        coefficient: n.C,
        suspended: n.B,
        point, // This remains the original point value
        ps,    // This contains either the converted array or single point array
        pl: n.PL
    }
};

const transformEGroup = (events: E[]): TransformedGroup[] => {
    const groupedByG = events.reduce((acc: { [key: number]: { G: number; E: { [key: number]: E[] } } }, item) => {
        const groupId = item.G;
        const typeId = item.T;

        if (!acc[groupId]) {
            acc[groupId] = { G: groupId, E: {} };
        }

        if (!acc[groupId].E[typeId]) {
            acc[groupId].E[typeId] = [];
        }

        acc[groupId].E[typeId].push(item);
        return acc;
    }, {});

    return Object.values(groupedByG).map(group => ({
        id: group.G,
        gs: undefined,
        outcomes: Object.values(group.E).map(arr =>
            arr.map(transformOutcome)
        )
    }));
};



