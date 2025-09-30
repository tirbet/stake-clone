export interface SportApiResponseDto<T> {
    Success: boolean;
    Error: string;
    Value: T | null;
}

export interface SportDto {
    id: number;
    name: string;
    count: number;
    leagueCount: number;
}
export function mapSportItem(apiItem: any): SportDto {
    // TODO Applay filter here
    return {
        id: apiItem.I,
        name: apiItem.N,
        count: apiItem.C,
        leagueCount: apiItem.CC
    };
}
