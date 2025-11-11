import { cn } from "@/lib/utils";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LeagueSection } from "@/components/sport/event/league-section";
import { SportIcon } from "@/components/icon";
import type { SportEventItem } from "@/types/sport-type";

export const CountrySection: React.FC<{ country: string; sportId: number; leagues: Record<string, SportEventItem[]> }> = ({
    country,
    sportId,
    leagues
}) => {
    return (
        <AccordionItem key={country} value={country} className="bg-[rgb(7,29,42)] rounded-sm mb-1 md:mb-2">
            <AccordionTrigger className={cn(
                "[&[data-state=open]>svg]:rotate-180 flex w-full",
                "items-center justify-between hover:no-underline",
                "p-1.5 md:p-3",
            )}>
                <div className="flex-1 text-left inline-flex items-center gap-1">
                    <SportIcon id={sportId} width={16} height={16} />
                    <span className="text-gray-200 text-sm font-semibold">
                        {country}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[rgb(26,44,56)] p-2 border-l border-r border-gray-700 rounded-b-sm">
                {Object.entries(leagues).map(([league, matches], index) => (
                    <LeagueSection key={league} league={league} matches={matches} defaultOpen={index === 0} />
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};