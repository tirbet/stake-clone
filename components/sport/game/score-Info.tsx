import { SportIcon } from "@/components/icon";
import { format } from "date-fns";
import { ClockIcon, MapIcon, ShieldIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProbabilityBar from "./probability-bar";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { cn } from "@/lib/utils";

type Game = GetSportsResponse[number];
type Team = Game['team'];
type Probability = Game['probability'];
type Props = {
    data: GetSportsResponse[number];
};
export default function ScoreInfo({ data }: Readonly<Props>) {

    const scoreContext = data.scoreContext;
    const periodScores = scoreContext?.periodScores ?? [];
    const stageLiveStatus = scoreContext?.stageLiveStatus
    const currentPlay = scoreContext?.currentPlay;

    const team = data?.team;
    const startTime = data?.startTime ? new Date(data.startTime * 1000) : undefined;
    const status = data?.status;
    const probability = data?.probability;
    const inningsData = scoreContext?.inningsData ?? [];

    const team1Score = inningsData.find(i => i.Key === 'Team1Scores')?.Value?.toString();
    const team2Score = inningsData.find(i => i.Key === 'Team2Scores')?.Value?.toString();
    const runRate = inningsData.find(i => i.Key === 'InnsStats')?.Value?.toString()?.split(';')?.pop();
    return (
        <div className="min-w-62.5 md:min-w-87.5 max-w-full w-auto rounded-sm bg-[rgb(26,44,56)]">
            <div className="flex p-1 items-center justify-between bg-sidebar overflow-auto w-full rounded-sm shadow-md">
                {status === 'upcoming' ? (<>
                    {startTime && (
                        <span className="flex items-center gap-1">
                            <ClockIcon className="text-orange-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="text-muted-foreground">{format(startTime, "hh:mm a MM/dd/yyyy")}</span>
                        </span>
                    )}
                </>) : (<>
                    <div className="flex items-center gap-1">
                        <SportIcon id={data.sport.id ?? 1} className="text-orange-400 w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="text-sm font-bold">{data?.periodName ? data?.periodName : scoreContext?.currentPeriodString || data.matchInfo?.format || data.matchInfo?.stage?.slice(0, 12)} {scoreContext?.info}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {stageLiveStatus && <span className="text-xs"> {stageLiveStatus}</span>}
                    </div>
                </>
                )}
            </div>
            <ScrollArea className="h-28 md:h-auto">
                {/* Full Time Score */}
                {scoreContext?.fullScore && (
                    <div className="mt-0.5 flex items-center justify-center rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-gray-200">
                        <span className="mr-1 text-gray-400">Full score</span>
                        <span className="text-white">
                            ({scoreContext.fullScore.home ?? 0}
                            <span className="mx-1 text-gray-400">:</span>
                            {scoreContext.fullScore.away ?? 0})
                        </span>
                    </div>
                )}

                {scoreContext && (
                    <div className="p-2 rounded-md text-xs w-full  overflow-x-auto">
                        <div className="flex justify-between text-gray-400 mb-1 px-2">
                            <span className="w-4" />
                            {periodScores.map(({ Key, Value }) => (
                                <span key={`header-${Key}`} className="w-16 text-center">
                                    {Value.NF}
                                </span>
                            ))}
                        </div>

                        <div className="relative flex items-center justify-between bg-black/20 p-1 rounded-sm mb-1">
                            <LiveShield active={currentPlay === 1} name={team.home.name} />
                            {periodScores.map(({ Key, Value }) => (
                                <span className="w-16 text-center" key={`s1-${Key}`}>
                                    {Value.S1 || 0}
                                </span>
                            ))}
                            {scoreContext?.setScore && (
                                <div className={cn("absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold", currentPlay === 1 ? 'text-yellow-400 animate-pulse' : 'text-gray-400')}>
                                    {scoreContext.setScore.S1}
                                </div>
                            )}
                            {team1Score && (
                                <span className="w-16 text-center">
                                    {team1Score}
                                    {currentPlay === 1 && runRate && (
                                        <span className="ml-1 text-green-400 animate-pulse">
                                            ({runRate})
                                        </span>
                                    )}
                                </span>
                            )}

                        </div>

                        <div className="relative flex items-center justify-between bg-black/20 p-1 rounded-sm">
                            <LiveShield active={currentPlay === 2} name={team.away.name} />

                            {periodScores.map(({ Key, Value }) => (
                                <span className="w-16 text-center" key={`s2-${Key}`}>
                                    {Value.S2 || 0}
                                </span>
                            ))}
                            {/* Tennis point score (absolute) */}
                            {scoreContext?.setScore && (
                                <div className={cn("absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold", currentPlay === 2 ? 'text-yellow-400 animate-pulse' : 'text-gray-400')}>
                                    {scoreContext.setScore.S2}
                                </div>
                            )}

                            {team2Score && (
                                <span className="w-16 text-center">
                                    {team2Score}
                                    {currentPlay === 2 && runRate && (
                                        <span className="ml-1 text-green-400 animate-pulse">
                                            ({runRate})
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* TODO: ProbabilityBar WP */}
                <div className="bg-[rgb(26,44,56)] w-2xs md:w-full  p-2 rounded-md text-xs  overflow-x-auto">
                    {probability && team && (
                        <ProbabilityBar title="Probability of winning" items={generateProbabilityItems(probability, team)} />

                    )}
                    {data?.matchInfo && (
                        <div className="mt-1 space-y-1 text-xs px-1.5 text-gray-300">
                            {data?.matchInfo.location && (
                                <span className="flex items-center gap-1">
                                    <MapIcon className="w-4 h-4" />
                                    {data.matchInfo.location}
                                </span>
                            )}
                            {data.matchInfo.stage && (
                                <span className="flex gap-1">
                                    <StageFlagIcon className="w-4 h-4" />
                                    {data.matchInfo.stage}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}


export function StageFlagIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className={className}
        >
            <path d="M5 3v18h2V3H5zm2 0h12l-2 6 2 6H7V3z" />
        </svg>
    );
}

export const generateProbabilityItems = (data: Probability, team: Team) => {
    const map = {
        home: { label: team.home.name, color: "bg-green-500" },
        draw: { label: "Draw", color: "bg-blue-500" },
        away: { label: team.away.name, color: "bg-gray-500" },
    };

    const order = ["home", "draw", "away"];

    return order
        .filter((key) => data?.[key as keyof Probability] !== undefined)
        .map((key) => ({
            label: map[key as keyof typeof map].label,
            color: map[key as keyof typeof map].color,
            value: data?.[key as keyof Probability]!,
        }));
};

function LiveShield({
    active,
    name
}: {
    active: boolean;
    name?: string;
}) {
    return (
        <div className="relative flex items-center">
            <span className={cn("w-4 h-4", active ? 'text-yellow-400' : 'text-gray-200')}>
                {name?.slice(0, 3).toUpperCase()}
            </span>
        </div>
    )
}
