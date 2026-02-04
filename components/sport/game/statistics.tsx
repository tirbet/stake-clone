import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SportIcon } from "@/components/icon";
import { ShieldCheckIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
type Props = {
    data?: GetSportsResponse[number];
}
const Statistic = ({ data }: Readonly<Props>) => {
    const scoreContext = data?.scoreContext;
    return (
        <TooltipProvider delayDuration={150}>
            <div className="min-w-62.5 md:min-w-87.5 max-w-full w-auto rounded-sm bg-[rgb(26,44,56)]">
                <div className="flex p-1 items-center justify-between bg-sidebar overflow-auto w-full rounded-sm shadow-md">
                    <TeamStat team={data?.team.home} />
                    <TeamStat team={data?.team.away} />
                </div>
                <ScrollArea className="h-28 md:max-h-full">
                    <div className="flex flex-col gap-0.5 md:gap-1 p-2">
                        {scoreContext?.matchStatistics?.[0]?.Value.map(({ N, S1, S2 }, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center justify-between text-xs md:text-sm bg-[rgb(26,44,56)] text-gray-300 py-1 px-1 rounded-md overflow-x-auto">
                                        {/* Team 1 stat */}
                                        <span className="w-10 text-center font-medium">{S1}</span>

                                        {/* Stat name */}
                                        <div className="flex-1 text-center text-xs text-white truncate px-1">
                                            {N}
                                        </div>

                                        {/* Team 2 stat */}
                                        <span className="w-10 text-center font-semibold text-yellow-400">
                                            {S2}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="bottom"
                                    align="center"
                                    className="w-48 rounded-md  px-3 py-2 shadow-lg">

                                    {/* Stat title */}
                                    <div className="text-xs font-semibold mb-1 text-center">
                                        {N}
                                    </div>

                                    {/* Divider */}
                                    <Separator />

                                    {/* Home team */}
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="truncate">{data?.team.home.name}</span>
                                        <span className="font-medium">{S1}</span>
                                    </div>

                                    {/* Away team */}
                                    <div className="flex items-center justify-between text-xs mt-0.5">
                                        <span className="truncate">{data?.team.away.name}</span>
                                        <span className="font-medium text-yellow-400">{S2}</span>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </ScrollArea>



            </div>
        </TooltipProvider>
    );
};

export default Statistic;
type TeamStatProps = {
    team?: {
        id: number;
        name: string;
        slug: string;
        countryId: number;
        logo?: string | null | undefined;
    };
}
const TeamStat = ({ team }: TeamStatProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                    <div className="flex items-center justify-center shrink-0 rounded-full w-4 h-4 border">
                        <img className="rounded-full object-contain size-full" alt={team?.name || 'Home'} src={`https://v3.traincdn.com/resized/size16/sfiles/logo_teams/${team?.logo}`} loading="lazy" />
                    </div>
                    <span className="text-sm font-bold">
                        {(team?.name ?? "").slice(0, 3).toUpperCase()}
                    </span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <div className="text-xs font-medium">
                    {team?.name}
                </div>
                {/* <div className="text-[10px] text-muted-foreground">
                    team
                </div> */}
            </TooltipContent>
        </Tooltip>
    )
}