"use client";

import { useMemo } from "react";
import { useLocale } from 'next-intl';
import { format, formatDistanceToNow } from "date-fns";
import type { Locale } from "date-fns";
import { enUS, hi, bn } from "date-fns/locale";
import { ClockIcon } from "lucide-react";
import type { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";

// Constants
const LOCALE_MAP: { [key: string]: Locale } = {
    en: enUS,
    hi,
    bn
} as const;

const STATUS_CONFIG = {
    'live': { type: 'live', label: 'Live' as const },
    'upcoming': { type: 'upcoming', label: 'Upcoming' as const },
    // Add other status codes as needed
} as const;

// Sub-components
const LiveDot = () => (
    <span className="relative flex h-3 w-3" data-testid="live-dot">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
    </span>
);

const StatusIndicator = ({ status }: { status: 'live' | 'upcoming' }) => {
    if (status === 'live') return <LiveDot />;
    if (status === 'upcoming') return <ClockIcon className="text-gray-500 w-4 h-4" />;
    return null;
};

const TeamScore = ({
    team,
    score,
    isHome = false
}: {
    team: {
        id: number;
        name: string;
        slug: string;
        countryId: number;
        logo?: string | null | undefined;
    };
    score?: string | number;
    isHome?: boolean;
}) => (
    <div className={cn(
        "flex items-center justify-between py-1",
        isHome ? "border-b border-gray-600" : ""
    )}>
        <div className="flex items-center justify-center gap-0.5">
            <div className="flex items-center justify-center shrink-0 rounded-full w-4 h-4 border">
                <img className="rounded-full object-contain size-full" alt={team.name || 'Home'} src={`https://v3.traincdn.com/resized/size16/sfiles/logo_teams/${team.logo}`} loading="lazy" />
            </div>
            <span className={cn(
                "text-sm",
                isHome ? "font-medium" : "text-gray-300"
            )}>
                {team.name}
            </span>
        </div>
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

const useEventStatus = (status: 'live' | 'upcoming', startTime?: number) => {
    return useMemo(() => {
        const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

        if (config) {
            return {
                type: config.type,
                label: config.label,
                isLive: status === 'live',
                isUpcoming: status === 'upcoming',
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
    event: GetSportsResponse[number];
    showScores?: boolean;
    className?: string;
}

export function EventInfo({
    event,
    showScores = false,
    className
}: EventInfoProps) {
    const locale = useLocale();
    const { status, team, ec, scoreContext, markets, startTime, slug } = event;

    // Use custom hooks for derived state
    const formattedStartTime = useFormattedStartTime(startTime, locale);
    const eventStatus = useEventStatus(status);

    // Safely extract team data with fallbacks
    const homeTeam = team?.home || { name: 'TBD' };
    const awayTeam = team?.away || { name: 'TBD' };



    const getStatusText = () => {
        if (eventStatus.isLive) {
            return scoreContext?.stageLiveStatus;
        }
        return formattedStartTime;
    };

    return (
        <div className={cn(
            "w-full md:w-[45%] p-3 rounded-lg bg-linear-to-r from-gray-900/50 to-gray-800/30",
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
                        <Link onClick={() => { }} href={slug} className="grid place-items-center w-full h-full">
                            {ec && (<Badge variant={"verified"}>{ec > 0 ? `+` : ''}{ec}</Badge>)}
                        </Link>
                    </div>
                </div>

                {/* Teams and Scores */}
                <Link href={slug} className="flex flex-col">
                    <TeamScore
                        team={team.home}
                        score={showScores ? scoreContext?.fullScore?.home : undefined}
                        isHome
                    />
                    <TeamScore
                        team={team.away}
                        score={showScores ? scoreContext?.fullScore?.away : undefined}
                    />
                </Link>

            </div>
        </div>
    );
}

// Additional helper component for compact view
export function CompactEventInfo({ event }: { event: GetSportsResponse[number] }) {
    const locale = useLocale();
    const { status, team, } = event;
    const formattedStartTime = useFormattedStartTime(new Date().getUTCDate(), locale);
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