import { Accordion } from "@/components/ui/accordion";
import { CountrySection } from "@/components/sport/event/country-section";
import type { SportEventItem } from "@/types/sport-type";
import { groupEventsByCountryAndLeague } from "@/lib/sport/sport-helper";

interface EventListContentProps {
    items: SportEventItem[];
    type: 'live' | 'upcoming';
}

export const EventListContent: React.FC<EventListContentProps> = ({ items, type }) => {

    const groupedEvents = groupEventsByCountryAndLeague(items);
    

    return (
        <>
            
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={Object.keys(groupedEvents)[0]}
            >
                {Object.entries(groupedEvents).map(([country, leagues]) => (
                    <CountrySection key={country} sportId={items[0].sportId} country={country} leagues={leagues} />
                ))}
            </Accordion>
        </>
    );
};