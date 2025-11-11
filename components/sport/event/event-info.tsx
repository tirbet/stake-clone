"use client";

import { useMemo } from "react";
import { useLocale } from 'next-intl';
import { format, formatDistanceToNow } from "date-fns";
import type { Locale } from "date-fns";
import { enUS, hi, bn } from "date-fns/locale";
import { ClockIcon } from "lucide-react";
import type { SportEventItem } from "@/types/sport-type";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import slugify from "slugify";
import { Badge } from "@/components/ui/badge";
import { useGameGroupStore } from "@/store/game-group-store";

// Constants
const LOCALE_MAP: { [key: string]: Locale } = {
    en: enUS,
    hi,
    bn
} as const;

const STATUS_CONFIG = {
    1: { type: 'live', label: 'Live' as const },
    3: { type: 'upcoming', label: 'Upcoming' as const },
    // Add other status codes as needed
} as const;

// Sub-components
const LiveDot = () => (
    <span className="relative flex h-3 w-3" data-testid="live-dot">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </span>
);

const StatusIndicator = ({ status }: { status: number }) => {
    if (status === 1) return <LiveDot />;
    if (status === 3) return <ClockIcon className="text-gray-500 w-4 h-4" />;
    return null;
};

const TeamScore = ({
    team,
    score,
    isHome = false
}: {
    team: { name: string };
    score?: string | number;
    isHome?: boolean;
}) => (
    <div className={cn(
        "flex items-center justify-between py-1",
        isHome ? "border-b border-gray-600" : ""
    )}>
        <span className={cn(
            "text-sm",
            isHome ? "font-medium" : "text-gray-300"
        )}>
            {team.name}
        </span>
        {score && (
            <span className="text-sm font-bold ml-2">
                {score}
            </span>
        )}
    </div>
);

const ScoreDisplay = ({
    periodScores,
    fullScore
}: {
    periodScores?: Array<{ Key: string; Value: { S1: number; S2: number } }>;
    fullScore?: { S1: number; S2: number };
}) => {
    if (!fullScore) return null;

    return (
        <div className="flex gap-2 items-center">
            {/* Period scores */}
            {periodScores?.map((item) => (
                <div
                    key={item.Key}
                    className="flex flex-col gap-1 text-xs text-gray-400"
                >
                    <span>{item.Value.S1}</span>
                    <span>{item.Value.S2}</span>
                </div>
            ))}

            {/* Full score */}
            <div className="flex flex-col gap-1 border border-gray-600 rounded px-2 py-1">
                <span className="text-sm font-bold">{fullScore.S1}</span>
                <span className="text-sm font-bold">{fullScore.S2}</span>
            </div>
        </div>
    );
};

// Custom hooks
const useFormattedStartTime = (startTime: number, locale: string) => {
    return useMemo(() => {
        try {

            const now = Date.now();
            const startDate = new Date(startTime * 1000);
            const diffInHours = (startDate.getTime() - now) / (1000 * 60 * 60);

            // If event starts within 24 hours → show relative time
            if (diffInHours <= 24) {
                return formatDistanceToNow(startDate, {
                    addSuffix: true,
                    locale: LOCALE_MAP[locale] || enUS,
                });
            }
            // If more than 24 hours away → show formatted date & time
            return format(startDate, "MMM d, yyyy, h:mm a", {
                locale: LOCALE_MAP[locale] || enUS,
            });

        } catch (error) {
            console.error('Error formatting date:', error);
            return "Time unavailable";
        }
    }, [startTime, locale]);
};

const useEventStatus = (status: number, startTime?: number) => {
    return useMemo(() => {
        const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

        if (config) {
            return {
                type: config.type,
                label: config.label,
                isLive: status === 1,
                isUpcoming: status === 3,
            };
        }

        // Fallback for unknown status codes
        return {
            type: 'unknown',
            label: 'Unknown',
            isLive: false,
            isUpcoming: false,
        };
    }, [status]);
};

// Main component
interface EventInfoProps {
    event: SportEventItem;
    showScores?: boolean;
    className?: string;
}

export function EventInfo({
    event,
    showScores = false,
    className
}: EventInfoProps) {
    const { setSelectedGroup } = useGameGroupStore();
    const locale = useLocale();
    const { status, startTime, team, ScoreContext } = event;

    // Use custom hooks for derived state
    const formattedStartTime = useFormattedStartTime(startTime, locale);
    const eventStatus = useEventStatus(status);

    // Safely extract team data with fallbacks
    const homeTeam = team?.home || { name: 'TBD' };
    const awayTeam = team?.away || { name: 'TBD' };



    const getStatusText = () => {
        if (eventStatus.isLive) {
            return ScoreContext.stageLiveStatus;
        }
        return formattedStartTime;
    };

    return (
        <div className={cn(
            "w-full md:w-[45%] p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/30",
            className
        )}>
            <div className="flex flex-col space-y-3">
                {/* Status Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <StatusIndicator status={status} />
                        <span className="text-xs text-gray-300 font-medium">
                            {getStatusText()}
                        </span>
                    </div>
                    <div className="md:hidden">
                        <Link onClick={() => setSelectedGroup(null)} href={`${event.status === 1 ? "/sport/live" : "/sport/upcoming"
                            }/${slugify(event.sportEn, { lower: true, strict: true })}/${event.leagueId
                            }-${slugify(event.leagueEn, { lower: true, strict: true })}/${event.Id
                            }-${slugify(event.team.home.nameEn, { lower: true, strict: true })}-vs-${slugify(
                                event.team.away.nameEn,
                                { lower: true, strict: true }
                            )}`} className="grid place-items-center w-full h-full">
                            <Badge variant={"verified"}>{event.EC > 0 ? `+` : ''}{event.EC}</Badge>
                        </Link>
                    </div>
                </div>

                {/* Teams and Scores */}
                <div className="flex flex-col">
                    <TeamScore
                        team={homeTeam}
                        score={showScores ? ScoreContext.fullScore.home : undefined}
                        isHome
                    />
                    <TeamScore
                        team={awayTeam}
                        score={showScores ? ScoreContext.fullScore.away : undefined}
                    />
                </div>

            </div>
        </div>
    );
}

// Additional helper component for compact view
export function CompactEventInfo({ event }: { event: SportEventItem }) {
    const locale = useLocale();
    const { status, team } = event;
    const formattedStartTime = useFormattedStartTime(event.startTime, locale);
    const eventStatus = useEventStatus(status);

    return (
        <div className="flex items-center justify-between w-full p-2 text-sm">
            <div className="flex items-center gap-2 flex-1">
                <StatusIndicator status={status} />
                <span className="truncate">
                    {team?.home?.name} vs {team?.away?.name}
                </span>
            </div>
            <span className="text-xs text-gray-400 ml-2">
                {eventStatus.isLive ? 'Live' : formattedStartTime}
            </span>
        </div>
    );
}