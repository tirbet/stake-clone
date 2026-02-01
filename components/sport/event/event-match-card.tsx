"use client";
import { Link } from "@/i18n/navigation";

import { EventInfo } from "@/components/sport/event/event-info";

import MarketGroup from "../odds/market-group";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";



export const EventMatchCard: React.FC<{ event: GetSportsResponse[number] }> = ({ event }) => {
    const markets = event.markets ?? [];
    return (
        <div key={event.id} className="flex p-0.5 mt-0.5 md:p-1 md:mt-1 border-b border-gray-700 flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <EventInfo event={event} showScores={event.status === 'live' ? true : false} />
            {markets.length === 0 ? (
                <div className="w-full md:w-[45%]" />
            ) : (
                <MarketGroup event={event}/>
            )}
            <div className="w-full hidden md:block md:w-[10%]">
                <Link onClick={() => {}} href={event.slug} className="grid place-items-center w-full h-full">
                    {event.ec > 0 ? `+` : ''} {event.ec}
                </Link>
            </div>
        </div>
    );
};

