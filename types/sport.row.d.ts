export interface APIResponse {
    Error: string;
    ErrorCode: number;
    Guid: string;
    Id: number;
    Success: boolean;
}

interface Sports {
    C: number;
    CC: number;
    I: number;
    MS?: number;
    E?: string;
    N: string;
}

interface League {
    CHIMG: string;
    CI?: number;
    CN: string;
    GC: number;
    L: string;
    LI: number;
    T?: number;
    LE?: string;
}

interface LeagueWithSub extends League {
    SC?: League[]
}

interface SportsWithLeagues extends Sports {
    L: LeagueWithSub[];
}

export interface GetSportsShortZip extends APIResponse {
    Value: SportsWithLeagues[]
}

export interface E {
    C: number;
    CV: string;
    G: number;
    P?: number;
    T: number;
    B?: boolean;
    GS?: number;
    PL?: {
        I: number;
        N: string;
        T: number;
    }
}

export interface AE {
    G: number;
    ME: E[];
}


interface MatchInfoOptional {
    Loc?: string;
    TSt?: string;
    MaF?: string;
}

interface MatchInfoItem {
    K: number;   // Key / type of info
    V: string;   // Value of the info
}

export interface WinProbability {
    P1: number;  // Probability for outcome 1
    P2: number;  // Probability for outcome 2
    PX: number;  // Probability for draw
}

interface baseEvent {
    B: number;
    CI: number;
    COI: number;
    GLI: number;
    HHTHS: boolean;
    HLU: boolean;
    HS: number;
    HSI: boolean;
    I: number;
    KI: number;
    LE: string;
    LI: number;
    MIO: MatchInfoOptional;
    MIS: MatchInfoItem[];
    O1: string;
    O1C: number;
    O1CT: string;
    O1E: string;
    O1I: number;
    O1IMG: string[];
    O2: string;
    O2C: number;
    O2CT: string;
    O2E: string;
    O2I: number;
    O2IMG: string[];
    PN: string;
    S: number;
    SE: string;
    SGI: string;
    SI: number;
    SIMG: string;
    SS: number;
    SSI: number;
    SST: number;
    STI: string;
    SUBA: boolean;
    T: number;
    TG: string;
    TN: string;
    TNS: string;
    V: string;
    VE: string;
    GSE: boolean;
    HL: boolean;
}


export interface ScoreContext {
    BR?: number;
    CP: number;
    CPS: string;
    FS: {
        S1?: number;
        S2?: number;
    },
    GS?: number;
    HC: number;
    I: string;
    P?: number; // in Cricket
    PS: {
        Key: number;
        Value: {
            NF: string;
            S1?: number;
            S2?: number
        }
    }[];
    S?: {
        Key: string;
        Value: string;
    }[]; // in Cricket
    SLS: string;
    ST?: {
        Key: number;
        Value: {
            ID: number;
            N: string;
            S1: string;
            S2: string;
        }[]
    }[];
    TD?: number; // in Cricket
    TR?: number;
    TS?: number;
}

export interface Get1x2_VZipEvent extends baseEvent {
    AE: AE[];
    CID: number;
    CN: string;
    E: E[];
    EC: number;
    L: string;
    LR: string;
    N: number;
    SGC: number;
    SN: string;
    SR: string;
    SmI: number;
    GVE: number;
    HLGI: boolean;
    IG: boolean;
    WP?: WinProbability;
    SC?: ScoreContext
}


export interface Get1x2_VZip extends APIResponse {
    Value: Get1x2_VZipEvent[]
}

export interface SG {
    CI: number;
    HBBP?: boolean;
    EC?: number;
    I: number;
    MG?: number;
    N?: number;
    P?: number;
    PN: string;
    SI?: number;
    SS?: number;
    T?: number;
    TI?: number;
    TG: string;
    V: string;
}

interface GetGameZipValue extends baseEvent {
    BBA: boolean;
    BIG?: SG[];
    CHIMG: string;
    CID: number;
    CMG?: number;
    CN: string;
    EC: number;
    EGC: number;
    IG: boolean;
    HSRT: boolean;
    GE: {
        E: Array<Array<E>>;
        G: number;
        GS: number;
    }[];
    SG?: SG[];
    SmI: number;
    WP?: WinProbability;
    L: string;
    N: number;
    SN: string;
}

export interface GetGameZip extends APIResponse {
    Value: GetGameZipValue
}


