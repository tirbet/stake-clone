"use client";
import { Link } from "@/i18n/navigation";
import type { SportEventItem } from "@/types/sport-type";
import { EventInfo } from "@/components/sport/event/event-info";
import slugify from "slugify";
import MarketGroup from "../odds/market-group";
import { useGameGroupStore } from "@/store/game-group-store";


export const EventMatchCard: React.FC<{ event: SportEventItem }> = ({ event }) => {
    const { setSelectedGroup } = useGameGroupStore();
    const allowedGroups = [1, 8, 17, 101, 2768];

    return (
        <div key={event.Id} className="flex p-0.5 mt-0.5 md:p-1 md:mt-1 border-b border-gray-700 flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <EventInfo event={event} showScores={event.status === 1 ? true : false} />
            {event.markets.length <= 0 ? (<div className="w-full md:w-[45%]" />) : (
                <MarketGroup event={event} allowedGroups={allowedGroups} />
            )}
            <div className="w-full hidden md:block md:w-[10%]">
                <Link onClick={() => setSelectedGroup(null)} href={`${event.status === 1 ? "/sport/live" : "/sport/upcoming"
                    }/${slugify(event.sportEn, { lower: true, strict: true })}/${event.leagueId
                    }-${slugify(event.leagueEn, { lower: true, strict: true })}/${event.Id
                    }-${slugify(event.team.home.nameEn, { lower: true, strict: true })}-vs-${slugify(
                        event.team.away.nameEn,
                        { lower: true, strict: true }
                    )}`} className="grid place-items-center w-full h-full">
                    {event.EC > 0 ? `+` : ''} {event.EC}
                </Link>
            </div>
        </div>
    );
};

